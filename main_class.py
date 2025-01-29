from tools import *

class MainCommonCommand:
    """    
    Attributes:
        hostname (str): Nom d'hôte du dispositif.
        enable_secret (str): Mot de passe pour le mode privilégié.
        banner_message (str): Message d'accueil du dispositif.
        domain_name (str): Nom de domaine configuré sur le dispositif.
        syslog_address (str): Adresse IP du serveur syslog.
        aliases (str): Dictionnaire des alias exécutables.
    """

    @staticmethod
    def set_hostname(hostname):
        """Configure le nom d'hôte."""
        return f"!\nhostname {hostname}\n"

    @staticmethod
    def set_enable_secret(pwd):
        """Configure le mot de passe secret."""
        return f"!\nenable secret {pwd}\n"

    @staticmethod
    def set_banner(msg):
        """Configure le message d'accueil."""
        return f"!\nbanner motd # {msg} #\n"

    @staticmethod
    def set_service_timestamps():
        """Active le timestamp des logs."""
        return "!\nservice timestamps log datetime\n"

    @staticmethod
    def disable_ip_domain_lookup():
        """Désactive la recherche de domaine IP."""
        return "!\nno ip domain-lookup\n"

    @staticmethod
    def set_domain_name(ip):
        """Configure le nom de domaine."""
        return f"!\nip domain-name {ip}\n"

    @staticmethod
    def set_logging(ip_srv):
        """Configure l'adresse du serveur syslog."""
        return f"!\nlogging {ip_srv}\n"

    @staticmethod
    def add_alias( alias: str, command: str):
        """Ajoute un alias exécutable."""
        return f"!\nalias exec {alias} {command}\n"

    @staticmethod
    def set_username( username, password,privilege_level="1"):
        """
        Configure un utilisateur avec privilège et mot de passe.
        """
        return f" username {username} privilege {privilege_level} secret {password}\n"



class Ntp:
    """ 
    Attributes:
        Configuration de ntp
    """
    @staticmethod
    def set_ntp_server( ntp_address):
        """Configure un serveur NTP."""
        return f"!\nntp server {ntp_address}\n"

    @staticmethod
    def enable_ntp_authentication():
        """Active l'authentification NTP."""
        return "!\nntp authenticate\n"

    @staticmethod
    def set_ntp_authentication_key( key_number, key_value):
        """
        Configure une clé d'authentification NTP.
        
        Args:
            key_number (int): Numéro de la clé.
            key_value (str): Clé de cryptage MD5.
        """
        return f"!\nntp authentication-key {key_number} md5 {key_value}\n"

    @staticmethod
    def set_ntp_trusted_key( key_number):
        """
        Configure une clé de confiance NTP.
        """
        return f"!\nntp trusted-key {key_number}\n"

    @staticmethod
    def enable_ntp_calendar_update():
        """Active la mise à jour du calendrier NTP."""
        return "!\nntp update-calendar\n"



class Line:
    """
    Classe parente pour les configurations communes des lignes.
    """
    @staticmethod
    def set_password( password):
        return f" password {password}\n"

    @staticmethod
    def enable_login(mode=""):
        """mode local ou vide """
        return f" login {mode}\n"

    @staticmethod
    def set_exec_timeout( minutes):
        return f" exec-timeout {minutes}\n"

    @staticmethod
    def exit():
        return " exit\n"



class Ssh:
    """
    Classe pour configurer SSH.
    """
    @staticmethod
    def set_domain_name( domain_name):
        """Configure le nom de domaine."""
        return f"!\nip domain-name {domain_name}\n"

    @staticmethod
    def generate_crypto_key(key):
        """Génère les clés RSA."""
        return f" crypto key generate rsa general-keys modulus {key}\n"

    @staticmethod
    def set_ssh_version( version):
        """
        Configure la version SSH.
        """
        return f" ip ssh version {version}\n"

    @staticmethod
    def set_ssh_timeout( seconds):
        """
        Configure le délai d'expiration SSH.
        """
        return f" ip ssh timeout {seconds}\n"

    @staticmethod
    def set_ssh_authentication_retries( retries):
        """
        Configure le nombre de tentatives d'authentification SSH.
        """
        return f" ip ssh authentication-retries {retries}\n"



class Interface: # Pour l'instant on ne divise pas en plusieurs class car il n'y a pratiquement pas de divergence
    """
    Classe pour la configuration des interfaces réseau.
    """

    @staticmethod
    def configure_interface( interface_type, interface_number):
        """Configure une interface avec son type et son numéro."""
        return f"!\ninterface {interface_type}{interface_number}\n"

    @staticmethod
    def set_ip_address( ip_address, subnet_mask):
        """Configure une adresse IP pour l'interface."""
        return f" ip address {ip_address} {prefixe_vers_masque(subnet_mask)}\n"

    @staticmethod
    def set_description( description):
        """Configure une description pour l'interface."""
        return f" description {description}\n"

    @staticmethod
    def set_speed( speed):
        """Configure la vitesse de l'interface."""
        return f" speed {speed}\n"

    @staticmethod
    def set_duplex( duplex):
        """Configure le mode duplex de l'interface."""
        return f" duplex {duplex}\n"

    @staticmethod
    def add_to_port_channel( port_channel_number,mode):
        """Ajoute l'interface à un port channel."""
        return f" channel-group {port_channel_number} mode {mode}\n"

    @staticmethod
    def enable_interface():
        """Active l'interface (no shutdown)."""
        return " no shutdown\n"
    
    @staticmethod
    def exit_interface():
        """Sors de l'interface"""
        return " exit\n"
    
    @staticmethod
    def interface_range_until(type,start_number,stop_number):
        """Entre dans un range d'interface (ex fa0/1-8)"""
        return f"!\n interface range {type}{start_number}-{stop_number}\n"

    @staticmethod
    def interface_range_and(type,start_number,stop_number):
        """Entre dans un range d'interface (ex fa0/1,8)"""
        return f"!\n interface range {type}{start_number},{stop_number}\n"
    
    @staticmethod    
    def set_interface_mode(mode):
        """Défini le mode access ou trunk """
        return f" switchport mode {mode}\n"



class Dhcp:
    """
    Classe pour gérer la configuration DHCP d'un routeur.
    """
    @staticmethod
    def set_network( address, mask):
        """Configurer le réseau."""
        return f" network {address} {prefixe_vers_masque(mask)}\n"

    @staticmethod
    def set_default_router( router_address):
        """Configurer l'adresse du routeur par défaut."""
        return f" default-router {router_address}\n"

    @staticmethod
    def set_dns_server( dns_address):
        """Configurer l'adresse du serveur DNS"""
        return f" dns-server {dns_address}\n"

    @staticmethod
    def set_domain_name( domain_name):
        """Configurer le nom de domaine."""
        return f" domain-name {domain_name}\n"

    @staticmethod
    def exclude_addresses( start, end):
        """Exclure une plage d'adresses IP."""
        return f"!\nip dhcp excluded-address {start} {end}\n"

    @staticmethod
    def enter_pool(pool_name):
        """Entrer dans le mode de configuration pour le pool DHCP"""
        return f"!\nip dhcp pool {pool_name}\n"

    @staticmethod
    def exit():
        """Quitter le mode de configuration."""
        return " exit\n"



class Stp:
    """
    Classe pour gérer la configuration Spanning Tree Protocol (STP) des équipements réseau.
    """
    @staticmethod
    def set_stp_mode( mode):
        """
        Configurer le mode du Spanning Tree Protocol.
        """
        return f"!\nspanning-tree mode {mode}\n"

    @staticmethod
    def set_vlan_root( vlan_number, role):
        """
        Configurer le VLAN comme root primaire ou secondaire.
        """
        return f"!\nspanning-tree vlan {vlan_number} root {role}\n"

    @staticmethod
    def set_vlan_priority( vlan_number, priority):
        """
        Configurer la priorité pour un VLAN.
        """
        return f"!\nspanning-tree vlan {vlan_number} priority {priority}\n"

    @staticmethod
    def enable_portfast_bpduguard_general():
        """
        Activer l'option PortFast et BPDU Guard par défaut.
        """
        return "!\nspanning-tree portfast bpduguard default\n"



class Ospf:
    """
    Class pour configurer le protocole OSPF
    """
    @staticmethod    
    def router_ospf(numero_AS):
        """Entrer dans la configuration du routeur ospf"""
        return f"!\nrouter ospf {numero_AS}\n"

    @staticmethod
    def set_router_id(router_id):
        """Configurer le router_ID"""
        return f" router-id {router_id}\n"

    @staticmethod
    def set_network(network,mask_inversee,num_area):
        """Configurer un network"""
        return f" network {network} {prefixe_vers_masque(mask_inversee,True)} area {num_area}\n"

    @staticmethod
    def set_default_information():
        """Activer default information"""
        return f" default-information originate\n"

    @staticmethod
    def set_passive_interface( interface_type, interface_number):
        """Configuerer une interface en passive avec son type et son numéro."""
        return f" passive-interface {interface_type}{interface_number}\n"

    @staticmethod
    def set_area_parameters_summerize(numero_AS,network,mask):
        """Résumer les routes correspondant à l'adresse/au masque"""
        return f"area {numero_AS} range {network} {prefixe_vers_masque(mask)}\n"
    
    @staticmethod
    def exit():
        """Quitter le mode de configuration."""
        return " exit\n"



class Eigrp:
    """
    Classe pour configurer le protocole EIGRP
    """
    @staticmethod
    def router_eigrp( as_number):
        """Entrer dans la configuration du routeur EIGRP"""
        return f"!\nrouter eigrp {as_number}\n"
    
    @staticmethod
    def set_network( network, masque_cidr):
        """Configurer un réseau dans EIGRP"""
        return f" network {network} {prefixe_vers_masque(masque_cidr,True)}\n"

    @staticmethod
    def disable_auto_summary():
        """Désactiver le résumé automatique des routes"""
        return f" no auto-summary\n"

    @staticmethod
    def set_passive_interface( interface_type, interface_number):
        """Configurer une interface en mode passive avec son type et numéro"""
        return f" passive-interface {interface_type}{interface_number}\n"
    
    @staticmethod
    def exit():
        """Quitter le mode de configuration."""
        return " exit\n"



class Rip:
    """
    Classe pour configurer le protocole RIP
    """
    @staticmethod
    def router_rip():
        """Entrer dans la configuration du routeur RIP"""
        return "!\nrouter rip\n"
    
    @staticmethod
    def set_version( version):
        """Configurer la version du protocole RIP (1 ou 2)"""
        return f" version {version}\n"
    
    @staticmethod
    def set_network( network, masque_cidr):
        """Configurer un réseau dans RIP"""
        return f" network {network} {prefixe_vers_masque(masque_cidr,True)}\n"
    
    @staticmethod
    def disable_auto_summary():
        """Désactiver le résumé automatique des routes"""
        return " no auto-summary\n"
    
    @staticmethod    
    def exit():
        """Quitter le mode de configuration."""
        return " exit\n"



class Acl:
    """Configuration des access-list"""

    @staticmethod
    def enter_acl(type,name_or_number):
        """type: extended ou standard, si numéro celui-ci doit correcpondre au type (0-99 standard) (100-199 extended)"""
        return f"!\nip access-list {type} {name_or_number}\n"
    @staticmethod    
    def config_standard_acl(deny_or_permit,any_or_host_or_ip,wildcard_mask_ip_case_or_ip_address_host_case=""):
        """Le dernier paramétre est optionnel il est a renseigner dans le cas d'une adresse ip"""
        return f" {deny_or_permit} {any_or_host_or_ip} {prefixe_vers_masque(wildcard_mask_ip_case_or_ip_address_host_case,True)}\n"
    @staticmethod    
    def config_extended_acl(args):
        acl =" ".join([f"{arg}" for arg in args])
        return f" {acl}\n"
    @staticmethod    
    def exit():
        return " exit\n"



class Qos:
    """Classe pour les commandes QoS communes aux switches et routeurs."""

    @staticmethod
    def create_class_map(name, match_type="match-all"):
        """Créer une class-map."""
        return f"!\nclass-map {match_type} {name}\n"

    @staticmethod
    def match_dscp(dscp_value):
        """Ajouter une correspondance DSCP."""
        return f" match ip dscp {dscp_value}\n"

    @staticmethod
    def match_ip_precedence(value):
        """Ajouter une correspondance IP Precedence."""
        return f" match ip precedence {value}\n"

    @staticmethod
    def match_protocol(protocol):
        """Ajouter une correspondance protocole."""
        return f" match protocol {protocol}\n"

    @staticmethod
    def create_policy_map(name):
        """Créer une policy-map."""
        return f"!\npolicy-map {name}\n"

    @staticmethod
    def set_bandwidth(percent):
        """Allouer une bande passante minimale."""
        return f" bandwidth percent {percent}\n"

    @staticmethod
    def set_class_default():
        """Configurer une classe par défaut."""
        return " class class-default\n"

    @staticmethod
    def apply_policy_map(direction, policy_name):
        """Appliquer une policy-map sur une interface."""
        return f" service-policy {direction} {policy_name}\n"
    
    @staticmethod
    def create_class(class_name):
        return f" class {class_name}\n"

    @staticmethod
    def exit():
        """Configurer un shaping du trafic."""
        return f" exit\n"



class Snmp:
    """Classe pour gérer la configuration SNMP."""

    @staticmethod
    def set_community(community, access_type="RO"):
        """Configurer une communauté SNMP avec un accès RO ou RW."""
        return f"!\nsnmp-server community {community} {access_type}\n"

    @staticmethod
    def set_location(location):
        """Configurer le lieu (location) SNMP."""
        return f"!\nsnmp-server location {location}\n"

    @staticmethod
    def set_contact(contact):
        """Configurer le contact SNMP."""
        return f"!\nsnmp-server contact {contact}\n"

    @staticmethod
    def enable_traps(trap_type="all"):
        """Activer les traps SNMP."""
        return f"!\nsnmp-server enable traps {trap_type}\n"
    


class Telephony:
    """Classe pour gérer la configuration de la téléphonie."""

    @staticmethod
    def configure_telephony_service(max_dn=None, max_ephone=None, source_address=None, port=None, voicemail=None):
        """Configurer les paramètres globaux du service de téléphonie."""
        config = (
            "!\ntelephony-service\n"
            f"{f' max-dn {max_dn}\n' if max_dn else ''}"
            f"{f' max-ephone {max_ephone}\n' if max_ephone else ''}"
            f"{f' ip source-address {source_address} port {port}\n' if source_address and port else ''}"
            f"{f' voicemail {voicemail}\n' if voicemail else ''}"
            " create cnf-files\n"
            " exit\n"
        )
        return config

    @staticmethod
    def configure_ephone_dn(dn_number, number=None, name=None):
        """Configurer un Directory Number (DN)."""
        config = (
            f"!\nephone-dn {dn_number}\n"
            f"{f' number {number}\n' if number else ''}"
            f"{f' name {name}\n' if name else ''}"
            " huntstop channel\n"
            " exit\n"
        )
        return config

    @staticmethod
    def configure_ephone(ephone_number, mac_address=None, phone_type=None, button_config=None):
        """Configurer un téléphone (ephone)."""
        config = (
            f"!\nephone {ephone_number}\n"
            f"{f' mac-address {mac_address}\n' if mac_address else ''}"
            f"{f' type {phone_type}\n' if phone_type else ''}"
            f"{f' button {button_config}\n' if button_config else ''}"
            " exit\n"
        )
        return config



class Hsrp:
    """Classe pour gérer la configuration HSRP."""

    @staticmethod
    def configure_hsrp_interface(group, virtual_ip):
        """Configurer une interface avec une adresse IP virtuelle HSRP."""
        return f" standby {group} ip {virtual_ip}\n"
        
    @staticmethod
    def set_priority(group, priority):
        """Configurer la priorité HSRP."""
        return f" standby {group} priority {priority}\n"

    @staticmethod
    def enable_preempt(group):
        """Activer la préemption HSRP."""
        return f" standby {group} preempt\n"

    @staticmethod
    def set_authentication(group, authentication):
        """Configurer l'authentification HSRP."""
        return f" standby {group} authentication {authentication}\n"

    @staticmethod
    def set_timers(group, hello_time, hold_time):
        """Configurer les timers HSRP."""
        return f" standby {group} timers {hello_time} {hold_time}\n"

    @staticmethod
    def track_interface(group, tracked_interface, decrement_value):
        """Configurer le suivi d'une interface pour HSRP."""
        return f" standby {group} track {tracked_interface} {decrement_value}\n"

    @staticmethod
    def exit():
        """Quitter la configuration de l'interface."""
        return " exit\n"
