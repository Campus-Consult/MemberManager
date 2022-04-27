cd "../src/WebUI/bin/Production/net6.0/"; tar cvzf - "publish" | ssh -4 cc@campus-consult.org "mkdir -p /tmp/membermanager; cd /tmp/membermanager; tar zxvf -"
