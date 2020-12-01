import React from 'react'
import axios from 'axios';


class Modal extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      disabled: "disabled",
    }
  }

  closeModal(e){
    e.preventDefault();
    document.querySelector('#myModal').style.display = 'none';
  }

  async editCreateNoteModal(e, id, operation){
    e.preventDefault();
    if (operation === 'edit'){
      let title = document.querySelector("#title_edit").value;
      let content = document.querySelector("#content_edit").value;
      const editNote = await axios.put(`https://noteappit.herokuapp.com/api/v1/note/${id}`, {title: title, content: content}).then(res => res.data)
      console.log(editNote)
      document.querySelector("#signal").innerHTML=`<div class="alert alert-success alert-dismissable alert-link">
      <button class="close" type="button" data-dismiss="alert" aria-hidden="true">×</button>
      Note with ID: ${id} has been updated.</div>`;
      setTimeout(function (){window.location.reload()}, 3000)
    } else {
      let title = document.querySelector("#title_add").value;
      let content = document.querySelector("#content_add").value;
      const editNote = await axios.post(`https://noteappit.herokuapp.com/api/v1/note`, {title: title, content: content}).then(res => res.data)
      console.log(editNote)
      document.querySelector("#signal").innerHTML=`<div class="alert alert-success alert-dismissable alert-link">
      <button class="close" type="button" data-dismiss="alert" aria-hidden="true">×</button>
      Note with ID: ${editNote.id} has been updated.</div>`;
      setTimeout(function (){window.location.reload()}, 3000)
    }
    this.closeModal(e)
  }

  async lengthCheck(e, id){
    const title = document.querySelector(`#title_${id}`).value
    const content = document.querySelector(`#content_${id}`).value
    const err = document.querySelector('#error');
    if (title.length < 10 || content < 20){
      err.innerHTML = `Title should be at least 10 characters and Content 20 Xters.`;
      document.querySelector(`#${id}`).setAttribute('disabled', 'disabled')
    } else {
      err.innerHTML = ``;
      document.querySelector(`#${id}`).removeAttribute('disabled')
    }
  }

  render() {
    console.log(this.props)
    let note = this.props.info
    let loadNoteHtml = ''
    if(note == 'no item'){
      loadNoteHtml = <div className="container"><form><div className="form-group"><label htmlFor="title_add">Title:</label><input type="text" className="form-control" id="title_add" placeholder="Enter title" maxLength="50" name="title_add" onChange={(e) => this.lengthCheck(e, 'add')} /></div><div className="form-group"><label htmlFor="content_add">Content:</label><textarea className="form-control" id="content_add" placeholder="Enter Content" name="content_add" maxLength="1000" onChange={(e) => this.lengthCheck(e, "add")}></textarea></div><button type="submit" id="add" className="btn btn-primary" onClick={(e) => { this.editCreateNoteModal(e, 0, 'add')}}>Add</button></form></div>
    } else {
      loadNoteHtml = <div className="container"><form><div className="form-group"><label htmlFor="title">Title:</label><input type="title" className="form-control" id="title_edit" placeholder="Enter title" maxLength="50" name="title_edit" defaultValue={note.title} onChange={(e) => this.lengthCheck(e, "edit")} /></div><div className="form-group"><label htmlFor="content_edit">Content:</label><textarea className="form-control" id="content_edit" placeholder="Enter Content" maxLength="1000" name="content_edit" onChange={(e) => this.lengthCheck(e, "edit")} defaultValue={note.content}></textarea></div><button type="submit" className="btn btn-primary" id="edit" onClick={(e) => { this.editCreateNoteModal(e, note.id, 'edit')} }>Edit</button></form></div>
    }

    return (
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title"> {note == 'no item' ? 'Add' : 'View/Edit Note'}  </h4>
              <button type="button" onClick={(e) => this.closeModal(e)}  className="close" data-dismiss="modal">&times;</button>
            </div>

            {/* Modal body */}
            <div className="modal-body">
              <div id="error"></div>
              {loadNoteHtml}
            </div>

            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" onClick={(e) => this.closeModal(e)} className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Modal;