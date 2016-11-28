#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
set -ex

function SetVariables {
  export HOME_FOLDER="$( dirname "${BASH_SOURCE[0]}" )"
  export VERSION_NUMBER=0.1.${1}
  export NVM_DIR="/var/lib/jenkins/.nvm"
}

function PutVersionNumber {
  set +x
  set -x
  txt="kampmoney-mobile-web "$'\n'"version number $1 built on $( date +"%F %T %Z" )"
  echo ${txt} > ${HOME_FOLDER}/version.txt
}


function BuildServices {
  # build mobile-app separately using npm
  # build angular was disabled until Chyngyz fixes it
  [ -s "$NVM_DIR/nvm.sh" ] 
  source "$NVM_DIR/nvm.sh" 
  npm run clean-install  # download dependencies if any
  npm run build  # build the angular app
}

SetVariables ${1}
PutVersionNumber ${VERSION_NUMBER}
BuildServices
