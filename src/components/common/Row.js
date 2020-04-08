import React from "react";
import Card from "@material-ui/core/Card";

import "../../styles/Row.scss";
import noPhoto from "../../assets/no-photo.png";

export const Row = ({
  name,
  locale,
  hairThickness,
  hairTexture,
  hairColor,
  hairLength,
  condition,
  hairGoals,
  frontSelfie,
  cvData
}) => {
  let dateTime = new Date(locale);
  let newDateTime = dateTime.setHours(dateTime.getHours() - 4);
  dateTime = new Date(newDateTime).toLocaleString();

  const textureScore = cvData && (cvData.texture.score * 100).toFixed(2);
  const lengthScore = cvData && (cvData.length.score * 100).toFixed(2);
  const colorScore = cvData && (cvData.color.score * 100).toFixed(2);

  const cvDataTexture = cvData && cvData.texture.value.toLocaleLowerCase();
  const cvDataLength = cvData && cvData.length.value.toLocaleLowerCase();
  let cvDataColor = cvData && cvData.color.value.toLocaleLowerCase();

  if (cvDataColor === "black" || "grey" || "silver") {
    cvDataColor = "black";
  }

  console.log(
    cvDataTexture,
    hairTexture,
    cvDataLength,
    hairLength,
    cvDataColor,
    hairColor
  );

  return (
    <div>
      <Card
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          marginBottom: `${5}px`
        }}
      >
        <div className="card-content">
          <div className="locale" color="textSecondary">
            {dateTime}
          </div>
          <div className="name" color="textSecondary">
            {name ? name : "n/a"}
          </div>
          <div className="image">
            {" "}
            {!frontSelfie || frontSelfie === "none" ? (
              <span className="image-container">
                <img id="selfie" alt={noPhoto} src={noPhoto} />{" "}
              </span>
            ) : (
              <span className="image-container">
                <img id="selfie" alt={frontSelfie} src={frontSelfie} />{" "}
              </span>
            )}
            <span className="image-container">
              {!cvData ? "cv_data n/a" : <div>texture: {textureScore}%</div>}
              {!cvData ? "" : <div>length: {lengthScore}%</div>}
              {!cvData ? "" : <div>color: {colorScore}%</div>}
            </span>
            {cvDataTexture === hairTexture &&
            cvDataLength === hairLength &&
            cvDataColor === hairColor
              ? ""
              : "C"}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.5
            }}
            color="textSecondary"
          >
            {" "}
            {!hairThickness ? "n/a" : hairThickness}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.5
            }}
            color="textSecondary"
          >
            {typeof hairTexture === "number"
              ? hairTexture === 1 || "1"
                ? "straight"
                : "" || hairTexture === "2" || 2
                ? "wavy"
                : "" || hairTexture === 3
                ? "curly"
                : "" || hairTexture === 4
                ? "coily"
                : ""
              : typeof hairTexture === "string"
              ? hairTexture
              : "n/a"}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.5
            }}
            color="textSecondary"
          >
            {hairColor ? hairColor : "n/a"}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.5
            }}
            color="textSecondary"
          >
            {hairLength ? hairLength : "n/a"}
          </div>
          <div className="user-attributes" color="textSecondary">
            {!condition
              ? "n/a"
              : condition === "none"
              ? "none"
              : condition.map(e => {
                  return (
                    <div key={e}>
                      {e} <br />
                    </div>
                  );
                })}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 1,
              lineHeight: "24px"
            }}
            color="textSecondary"
          >
            {!hairGoals ? "n/a" : hairGoals ? hairGoals.join(", ") : ""}
          </div>
          <br />
        </div>
      </Card>
    </div>
  );
};
