# popote

**popote** is a web app, your modern cookbook.

- Create many recipes
- Keep them organized for the long haul

A great alternative to bunch of index cards in a folder!

## 1 - Install dependencies

These instructions will get you a copy of the project up and running on your local machine, for development purposes.

- Install **Node.js** and **yarn**:

```
curl https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install curl
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
yarn
```

- Install **Python 3.7** dependencies:

```
pip install -r python/requirements.txt
```

## 2 - Launch popote

### 2.1 - Run Python server

In order to make the Python server listening on the 5000 port, run the following:

```
yarn back:env
```

### 2.2 - Compile the code

```
yarn front:dev
```

### 2.2 - Open popote

Click on this link to locally open popote: [popote](http://localhost:8080/)
