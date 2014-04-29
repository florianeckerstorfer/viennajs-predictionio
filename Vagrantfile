# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
PIO_PROVISION = "pio-vagrant.sh"
PIO_PROVISION_ARGS = "'vagrant'"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise64"

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "90", "--memory", "2048"]
  end

  # install PredictionIO
  config.vm.provision :shell do |s|
    s.path = PIO_PROVISION
    s.args = PIO_PROVISION_ARGS
  end

  config.vm.network "private_network", ip: "192.168.33.20"
  # config.vm.network :forwarded_port, guest: 9000, host: 9900
  # config.vm.network :forwarded_port, guest: 8000, host: 8900
  # config.vm.network :forwarded_port, guest: 50030, host: 50030
  # config.vm.network :forwarded_port, guest: 50060, host: 50060
  # config.vm.network :forwarded_port, guest: 50070, host: 50070
  # config.vm.network :forwarded_port, guest: 50075, host: 50075
end
