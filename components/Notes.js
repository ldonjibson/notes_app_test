import React from 'react';
import Link from 'next/link';
import Modal from './Modal';


class Notes extends React.Component {
  constructor(props){
		super(props);
		this.state = { 
      noteId : 0,
      singleNote: 'no item'
		}
	}
  
  async openNoteDetails(e, noteId){
		e.preventDefault();
    let mdl = document.querySelector("#myModal");
    mdl.setAttribute('class', 'modal fade show');
    mdl.style.display='block';
  }

  async openAddNote(e){
		e.preventDefault();
    let mdl = document.querySelector("#myModal");
    mdl.setAttribute('class', 'modal fade show');
    mdl.style.display='block';
    // document.querySelector("#title_add").value=""
    // document.querySelector("#content_add").value=""
  }


	render(){
    console.log(this.props)
    let getNotes = this.props.getNotes;
    let singleNote = this.state.singleNote;

    const truncate = (str) => {
      return str.length > 20 ? str.substring(0, 19) + "..." : str;
    }

    const formatDate = (str) => {
      const options = {year: "numeric", month: "short", day: "numeric"}
      return new Date(str).toLocaleDateString(undefined, options)
    }

		return (
      <div className="container">
        <div className="row">
          <div id="signal"></div>
          <div className="col-8">
            <p>Table of My Note</p>
          </div>
          <div className="col-4">
            <button className="btn btn-primary btn-sm" 
            onClick={(e) => {
              this.openAddNote(e);
              this.setState({ noteId: 0, singleNote: 'no item' });
            }}> Add Note</button>
          </div>
        </div>   
        <div className="row table-responsive">
          <table className="table table-transparent">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Date Created</th>
                <th>Date Updated</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
            {getNotes.map((note, index) =>(
              <tr key={index}>
                <td>{note.id}</td>
                <td>{note.title}</td>
                <td>{truncate(note.content)}</td>
                <td>{formatDate(note.date_created)}</td>
                <td>{formatDate(note.date_updated)}</td>
                <td>
                <button className="btn btn-info btn-md" 
                  onClick={(e) => { 
                    this.openNoteDetails(e, note.id);
                    this.setState({singleNote: note, noteId: note.id});
                  }}>
                  View/Edit 
                </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          { this.state.noteId !== 0 || singleNote !== 'no item' ? (<Modal info={singleNote} />) : (<Modal info="no item" />)}
        </div>
      </div>
		)
	}
};

export default Notes;