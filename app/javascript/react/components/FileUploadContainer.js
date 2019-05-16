import React, { Component } from 'react';
import Dropzone from "react-dropzone";

class FileUploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      file: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let body = new FormData()
    body.append("event_photo", this.state.file[0])
    body.append("event_id", this.props.eventID)
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    fetch('/api/v1/pictures', {
      credentials: 'same-origin',
      method: 'POST',
      body: body,
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ message: body.message })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onDrop(file) {
    if(file.length == 1) {
      this.setState({ file: file })
    } else {
      this.setState({ message: 'You can only upload one photo per submission'})
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}   className="dropzone">
        <section>
          <div>
            <Dropzone
             onDrop={this.onDrop}
             style={{"width" : "500px", "height": "100px", "border" : "1px dotted black"}}
             >
              <p>Try dropping some files here,<br /> or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default FileUploadContainer;
