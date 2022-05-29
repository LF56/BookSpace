import React from "react";

function Books(props) {

    return (
                
                    <div className="uk-card-small uk-height-max-meduim" >
                        <div className="uk-card-media-top">
                            <img src={props.image} width="auto" height="auto" className="uk-object-position-center-center" alt="" />
                        </div>
                        <div className="uk-card-body">
                            <h3 className="uk-card-title">{props.title}</h3>
                            <p>{props.authors}</p>
                            <p>{props.description}</p>
                            <p>{props.stars}</p>
                            <button class="uk-button uk-button-default">Button</button>
                        </div>
                    </div>
    );
}

export default Books;