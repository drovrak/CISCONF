from ipaddress import IPv4Network

def prefixe_vers_masque(prefixe, wildcard=False):
    if prefixe.startwith('/'):
        réseau = IPv4Network(f'0.0.0.0/{prefixe}', strict=False)
        return str(réseau.hostmask if wildcard else réseau.netmask)
    else:
        return prefixe