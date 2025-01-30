from ipaddress import IPv4Network

def prefixe_vers_masque(prefixe, wildcard=False):
    if prefixe.startswith('/'):
        réseau = IPv4Network(f'0.0.0.0/{prefixe[1:]}', strict=False)
        return str(réseau.hostmask if wildcard else réseau.netmask)
    else:
        return prefixe
