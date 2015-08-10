VPN Switcher
====
A web-based VPN Switcher

##What?
Given a VPN server A, and several VPN connections you know. You want to connect to A, and switch the next VPN hop around, well, this project does this via a web UI.

##How?
Basically via `ip route` and `ip rule` to switch local route table for one user.
Meteor provides good reactive framework for better effect.
Polymer provides good UI.

##TODO List
- [x] navigate menu
- [x] tree-like VPN settings
- [ ] `ip` command utility
- [ ] connection and VPN sites
- [ ] VPN sites UI, speed testing
- [ ] connect and switch
- [ ] ...?

