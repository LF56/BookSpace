import React from "react";

function Books(props) {

    return (
                
                    <div className="uk-card-small">
                        <div className="uk-card-media-top">
                            <img src={props.image} width="auto" height="auto" alt="" />
                        </div>
                        <div className="uk-card-body">
                            <h3 className="uk-card-title">{props.title}</h3>
                            <p>{props.authors}</p>
                            <p>{props.description}</p>
                            <p>{props.stars}</p>
                            <button className="uk-button uk-button-default">

                            </button>
                        </div>
                    </div>
    );
}

export default Books;