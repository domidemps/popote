# popote

**popote** is a web app, your modern cookbook.
- Create many recipes
- Keep them organized for the long haul

A great alternative to bunch of index cards in a folder!

## 1 - Install dependencies

These instructions will get you a copy of the project up and running on your local machine, for development purposes.

* Install **Node.js** and **npm**:
```
curl https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install
```

* Install **Python 3.7** dependencies:
```
pip install -r requirements.txt
```

## 2 - Launch popote

### 2.1 - Run Python server

In order to make the Python server listening on the 5000 port, run the following:
```
python server.py --debug --env
```
Or the concise way 
```
python server.py -de
```

### 2.2 - Compile the code

To compile the code and launch a 8080 "proxy", run the following:
```
npm start
```

### 2.3 - Open popote

Click on this link to locally open popote: [popote](http://localhost:8080/)
