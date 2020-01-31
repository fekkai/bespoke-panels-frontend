import React from 'react'
import '../styles/Panel.scss'
import { Carousel } from "react-responsive-carousel";

export default function UserAnswers(props) {
    return (
        <div className="stylist-panel-customer">
        <div className="column-title">Characteristics</div>
        <div className="column-title">Profile</div>
        <div className="column-title">Selfie</div>
        <div className="info-container info-container2">
          THICKNESS:{" "}
          {props.thickness
            ? props.thickness === 1
              ? "finest"
              : "" || props.thickness === 2
              ? "finer"
              : "" || props.thickness === 3
              ? "fine"
              : "" || props.thickness === 4
              ? "medium"
              : "" || props.thickness === 5
              ? "thick"
              : "" || props.thickness === 6
              ? "thicker"
              : "" || props.thickness === 7
              ? "thickest"
              : ""
            : ""}
          <br />
          <br />
          TEXTURE:{" "}
          {props.texture
            ? props.texture === 1
              ? "straight"
              : "" || props.texture === 2
              ? "wavy"
              : "" || props.texture === 3
              ? "curly"
              : "" || props.texture === 4
              ? "coily"
              : ""
            : ""}
          <br />
          <br />
          CONDITION: {props.condition}
          <br />
          <br />
          MAIN GOALS: {props.hairGoals}
          <br />
          <br />
          SECONDARY GOALS: {props.hairGoals2}
          <br />
          <br />
          FRAGRANCE: {props.fragrance}
          <br />
          <br />
        </div>

        <div className="info-container">
          AGE:{" "}
          {props.age
            ? props.age === 1
              ? "20s"
              : "" || props.age === 2
              ? "30s"
              : "" || props.age === 3
              ? "40s"
              : "" || props.age === 4
              ? "50s"
              : "" || props.age === 4
              ? "60s"
              : "" || props.age === 4
              ? "70+"
              : ""
            : ""}
          <br /> <br />
          DIET: {props.diet}
          <br />
          <br />
          ZIP: {props.zip}
          <br />
          <br />
          CITY: {props.city}
          (UV: {props.uvRisk}; AIR QUALITY: {props.airQuality}; WATER PH:{" "}
          {props.waterHardness}; HUMIDITY: {props.humidity}; WIND: {props.windSpeed})
          <br />
          <br /># AFTERWASH PRODUCTS: {props.afterwash}
        </div>

        <div className="selfie-container">
          <Carousel showThumbs={false} showIndicators={false}>
            <div>
              <img style={{ width: `${85}%` }} src={props.frontSelfie} />
            </div>
            <div>
              <img style={{ width: `${85}%` }} src={props.sideSelfie} />
            </div>
          </Carousel>
        </div>
      </div>
    )
}
