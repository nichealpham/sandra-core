# WfdbService.Cassandra
Compute Engine service for Signal processing/Data preparation using WFDB package

### Key Features

* Nodejs Backend
* Typescript
* GCP Compute Engine/EC2
* Cloud Storage
* WFDB Package

## System Requirements
* WFDB Package
```
>>  sudo apt-get install gcc libcurl4-openssl-dev libexpat1-dev
>>  wget https://www.physionet.org/physiotools/wfdb.tar.gz
>>  tar xfvz wfdb.tar.gz
>>  cd wfdb-10.6.0
>>  ./configure
>>  sudo make install

>> make check
```

* GSuit
```
>>  export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
>>  echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a \n
    /etc/apt/sources.list.d/google-cloud-sdk.list
>>  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
>>  sudo apt-get update && sudo apt-get install google-cloud-sdk
>>  sudo apt-get install google-cloud-sdk-datalab

>> gcloud init
```

* Python 2.7 + matplotlib
```
>>  python -m pip install -U pip
>>  python -m pip install -U matplotlib
```

### The MIT License (MIT)

