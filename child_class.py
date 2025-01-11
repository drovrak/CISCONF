from main_class import *



class MainRouterCommand(MainCommonCommand):
    """Description"""

    @staticmethod
    def set_ip_route(destination,mask,next_hope):
        """Défini une route statique, next hope est à la fois une interface et une adresse ip """
        return f"!\nip route {destination} {mask} {next_hope}\n"



class MainSwitchCommand(MainCommonCommand):
    """Description"""

    @staticmethod
    def set_default_gw(gw):
        """Défini une route par défaut"""
        return f"!\nip default-gateway {gw}\n"



class Vty(Line):
    """Classe pour configurer les lignes VTY."""

    @staticmethod
    def set_vty_line():
        return f"!\nline vty 0 15\n"

    @staticmethod
    def set_transport_input( method, protocol):
        return f" transport {method} {protocol}\n"



class LineConsole(Line):
    """
    Classe pour configurer la ligne console.
    """
    @staticmethod
    def set_console_line():
        return "!\nline console 0\n"
    @staticmethod
    def enable_logging_synchronous():
        return " logging synchronous\n"

    @staticmethod
    def set_history_size( size):
        return f" history size {size}\n"



class Nat(Interface):
    """Classe pour gérer la configuration NAT et PAT."""

    @staticmethod
    def configure_inside_interface():
        """Configurer NAT Inside."""
        return f" ip nat inside\n"

    @staticmethod
    def configure_outside_interface():
        """Configurer NAT Outside."""
        return f" ip nat outside\n"

    @staticmethod
    def configure_static_nat(inside_ip, outside_ip):
        """Configurer un NAT statique."""
        return f"!\nip nat inside source static {inside_ip} {outside_ip}\n"

    @staticmethod
    def configure_dynamic_nat(access_list, pool_name):
        """Configurer un NAT dynamique."""
        return f"!\nip nat inside source list {access_list} pool {pool_name}\n"

    @staticmethod
    def configure_nat_pool(pool_name, start_ip, end_ip, netmask):
        """Créer un pool NAT."""
        return f"!\nip nat pool {pool_name} {start_ip} {end_ip} netmask {netmask}\n"

    @staticmethod
    def configure_pat(interface, access_list):
        """Configurer un PAT."""
        return f"!\nip nat inside source list {access_list} interface {interface} overload\n"



class Vlan(Interface): # Hérite d'interface car certaine commande d'interface sont communes aux interfaces vlan
    """Commande de configuration d'interface pour les switch"""

    @staticmethod    
    def set_allowed_vlan_on_trunk(vlan_allowed="all"):
        """Défini les vlans autorisés sur l'interface"""
        return f" switchport trunk allowed vlan {vlan_allowed}\n"

    @staticmethod
    def set_vlan_on_access(vlan):
        """Vlan sur le port d'accès"""
        return f" switchport access vlan {vlan}\n"     

    @staticmethod
    def set_voice_vlan(voice_vlan):
        """Défini le numéro de vlan voix"""
        return f" switchport voice vlan {voice_vlan}\n"

    @staticmethod
    def set_native_vlan(vlan):
        """Défini le vlan natif"""
        return f" switchport trunk native vlan {vlan}\n"

    @staticmethod
    def set_vlan_name(vlan_number,vlan_name):
        """Défini le nom du vlan"""
        return f"!\nvlan {vlan_number}\n name {vlan_name}\n exit\n"



class StpInterfaceSwitch(Stp,Interface):
    """Commandes stp pour les switch"""
    @staticmethod    
    def enable_porfast_on_interface():
        """active le porfast"""
        return f" spanning-tree portfast\n"

    @staticmethod    
    def enable_bpduguard_on_interface():
        """active bpuguard"""
        return f" spanning-tree bpduguard enable\n"



class QosSwitch(Interface):
    """Classe pour les commandes QoS spécifiques aux switches."""

    @staticmethod
    def enable_qos():
        """Activer QoS sur le switch."""
        return "!\nmls qos\n"

    @staticmethod
    def trust_cisco_phone():
        """"""
        return f" mls qos trust device cisco-phone\n"

    @staticmethod
    def trust_cos_dscp(cos_or_dscp):
        """Configurer une interface pour faire confiance au marquage CoS."""
        return f" mls qos trust {cos_or_dscp}\n"









"""
FAIRE UNE CLASSE SPECIFIQUE HSRP,SPANNING-TREE

POUR SNMP CONTROLER SUR GNS3 ou sur LES COURS DE NGUYEN, IDEM POUR lA QOS/TELEPHONIE AVEC LES COURS DE DEPEYRE.
"""

if __name__ == "__main__":
    config = str()
    config += MainCommonCommand.set_hostname("SWITCH1")
    config += MainCommonCommand.set_banner("ACCESS CONTROLED")
    config += MainCommonCommand.disable_ip_domain_lookup()
    config += MainCommonCommand.set_logging("192.168.1.2")
    config += MainCommonCommand.set_enable_secret("cisco")

    config += Ntp.set_ntp_server("192.10.1.3")

    config += Vty.set_vty_line()
    config += Vty.set_exec_timeout("3")
    config += Vty.set_transport_input("input","ssh")
    config += Vty.enable_login("local")
    config += Vty.exit()    

    config += LineConsole.set_console_line()
    config += LineConsole.enable_logging_synchronous()
    config += LineConsole.enable_login("local")
    config += LineConsole.exit()

    config += Ssh.set_domain_name("CISCONF.com")
    config += Ssh.set_ssh_version("2")
    config += Ssh.set_ssh_authentication_retries("5")

    config += Interface.interface_range_until("fa0/","0","1")
    config += Interface.add_to_port_channel("5","active")
    config += Interface.enable_interface()
    config += Interface.configure_interface("po","5")
    config += Interface.set_interface_mode("trunk")
    config += Interface.enable_interface()
    config += Interface.exit_interface()

    config += Vlan.set_vlan_name("10","CISCONF")
    config += Vlan.set_vlan_name("50","VOICE")
    config += Vlan.configure_interface("vlan","10")
    config += Vlan.set_ip_address("192.168.1.1","255.255.255.0")
    config += Vlan.configure_interface("fa","0/5")
    config += Interface.set_interface_mode("access")
    config += Vlan.set_vlan_on_access("10")
    config += Vlan.set_voice_vlan("50")
    config += Interface.enable_interface()
    config += Interface.exit_interface()

    config += Ospf.router_ospf("1")
    config += Ospf.set_router_id("4.4.4.4")
    config += Ospf.set_passive_interface("fa","0/1")
    config += Ospf.set_network("192.168.122.0","0.0.0.255","0")
    config += Ospf.set_default_information()
    config += Ospf.exit()

    config += Acl.enter_acl("extended","test")
    config += Acl.config_extended_acl(args=["permit","tcp","host","192.168.4.2","any","gt","domain","established"])
    config += Acl.exit()
    config += Acl.enter_acl("standard","testS")
    config += Acl.config_standard_acl("permit","any")
    config += Acl.exit()

    config += Stp.set_stp_mode("rapid-pvst")
    config += Stp.set_vlan_root("20","primary")
    config += StpInterfaceSwitch.configure_interface("fa","0/6")
    config += StpInterfaceSwitch.enable_porfast_on_interface()

    config += Nat.configure_interface("fa","0/6")
    config += Nat.configure_inside_interface()
    config += Nat.configure_interface("fa","0/2")
    config += Nat.configure_outside_interface()
    config += Nat.exit_interface()
    config += Nat.configure_static_nat("192.168.1.10", "203.0.113.5")
    config += Nat.configure_nat_pool("POOL1", "203.0.113.6", "203.0.113.10", "255.255.255.248")
    config += Nat.configure_dynamic_nat("10", "POOL1")
    config += Nat.configure_pat("GigabitEthernet 0/2", "10")

    config += Qos.create_class_map("VOIP")
    config += Qos.match_dscp("ef")
    config += Qos.match_protocol("rtp")
    config += Qos.create_class_map("HTTP", "match-any")
    config += Qos.match_protocol("http")
    config += Qos.match_ip_precedence("2")
    config += Qos.create_policy_map("QOS_POLICY")
    config += Qos.create_class("VOIP")
    config += Qos.set_bandwidth(20)
    config += Qos.exit()
    config += Qos.create_class("HTTP")
    config += Qos.set_bandwidth(10)
    config += Qos.exit()
    config += Qos.set_class_default()
    config += Interface.configure_interface("g","0/1")
    config += Qos.apply_policy_map("output", "QOS_POLICY")
    config += Qos.exit()

    config += Snmp.set_community("PUBLIC", "RO")
    config += Snmp.set_community("PRIVATE", "RW")
    config += Snmp.set_location("Data Center - Paris")
    config += Snmp.set_contact("Admin: admin@domain.com")
    config += Snmp.enable_traps("environment")

    config += Telephony.configure_telephony_service(
        max_dn=10,
        max_ephone=5,
        source_address="192.168.1.1",
        port=2000,
        voicemail="6000"
    )

    config += Telephony.configure_ephone_dn(
        dn_number=1,
        number="1001",
        name="User1"
    )

    config += Telephony.configure_ephone(
        ephone_number=1,
        mac_address="0012.3456.789A",
        phone_type="7965",
        button_config="1:1"
    )

    config += Interface.configure_interface("g","0/1")
    config += Hsrp.configure_hsrp_interface(group=1, virtual_ip="192.168.1.1")
    config += Hsrp.set_priority(group=1, priority=110)
    config += Hsrp.enable_preempt(group=1)
    config += Hsrp.set_authentication(group=1, authentication="cisco123")
    config += Hsrp.set_timers(group=1, hello_time=3, hold_time=10)
    config += Hsrp.track_interface(group=1, tracked_interface="GigabitEthernet0/2", decrement_value=20)
    config += Hsrp.exit()



    print(config)

