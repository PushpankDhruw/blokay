# install docker
if command -v docker &> /dev/null ; then
    echo "docker is already installed..."
    echo "skipping docker installation..."
    exit 0
fi

command_present() {
  type "$1" >/dev/null 2>&1
}

if ! command_present wget && command_present yum; then
  sudo yum install wget
fi

wget -qO- https://get.docker.com/ | sh

# install docker componse
if command -v docker-compose &> /dev/null ; then
    echo "docker-compose is already installed..."
    echo "skipping docker-compose installation..."
    exit 0
fi

sudo -E curl -L https://github.com/docker/compose/releases/download/1.29.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose