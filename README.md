# IPFS file access & storage in javascript

This react application provides a way to store files of many types on a certain ipfs node (public or private) directly through the web browser using only node.js and ipfs-api dependencies.

## To get started

Clone this repo

```bash
git clone https://github.com/bam-emr/ipfs-react.git <FOLDER NAME>
```
Now navigate to the directory, 

Install the node.js dependencies

```bash
npm install
```
The IPFS-api

```bash
npm install --save ipfs-api
```
Make sure no other applications are running on the port:3000

## To save IPFS file hash values for later use

Create a `.txt` file in the application directory (this can be a `.json` file as well but change the following accordingly).

Open the `App.js` file and add the following function before the `render ()` function call:

```javascript
const fs = require('fs') 

fs.writeFile('Output.txt', result[0].hash, (err) => {  
    if (err) throw err; 
}) 
```

## Running the application

```bash
npm run start
```
Open your browser's console, add, and upload a file. By clicking `submit`, the file is now pushed to the ipfs node.

## Changing the IPFS node

In the `ipfs.js` source file, the properties of the server can be changed. By default, it connects to the `ipfs.infura.io` gateway (a public network).
