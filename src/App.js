import React, { Component } from 'react'
import './App.css'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

class App extends Component {

  //Constructor specifying state & function properties
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //Creating web3 connection for ETH communication (to be used later)
  componentWillMount() {
    // Web3 instance
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  //Reads and processes file from input
  captureFile(event) {
    event.preventDefault()

    console.log('File Pushed to Network')
    const file = event.target.files[0]
    const reader = new window.FileReader()

    //Creates a buffer for file to be processed in the most supported
    //and quickest way
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event) {
    event.preventDefault()

    //ipfs-api: adding buffer of file to ipfs node specified in ipfs.js
    console.log('Uploaded to IPFS!')
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      
      //returns and prints the hash of the file on the ipfs node
        console.log('ipfs hash = ', result[0].hash)  
      return this.setState({ ipfsHash: result[0].hash })
        
      })
  }

  //Html display
  render() {
    return (
      <div className="App">
        <main className="container">
        <nav>
              <h1 >IPFS File Upload</h1>
        </nav>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>The uploaded File:</h1>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload File</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App