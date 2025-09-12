import React from "react";
import './ImageLinkform.css';
const ImageLinkform= ({onInputChange, onButtonClick}) => {
return(
    <div>
    <p className="f4">
        {'This brain will detect your picture.Get it a trile'};
    </p>
    <div className="center">
    <div className="form center pa4 br3 shadow-5">
        <input className="f3 pa2 w-70 center" type="text" onChange={onInputChange}/>
        <button className="w-30 grow link f4 ph3 pv2 dib white light bg-light-purple "
        onClick={onButtonClick}>Detect</button>
    </div>
    </div>
    </div>
    );
}

export default ImageLinkform;