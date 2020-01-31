import React from 'react'
import { Paper, useScrollTrigger } from "@material-ui/core";

import '../styles/Panel.scss'

export default function FormulaEdit(props) {
    return (
        <div class="edit">
                    SKELETON:
                    <select onChange={this.props.selectShampoo}>
                      <option
                        selected={
                            this.props.shampooSkeletonKey === "volume1" ? true : false
                        }
                        value="volume1"
                      >
                        Full Blown (Lightest Weight)
                      </option>
                      <option
                        selected={
                          this.props.shampooSkeletonKey === "colorprotect1" ? true : false
                        }
                        value="colorprotect1"
                      >
                        Technician Color (Medium Moisture)
                      </option>
                      <option
                        selected={
                          this.props.shampooSkeletonKey === "moisture1" ? true : false
                        }
                        value="moisture1"
                      >
                        Brilliant Shine (Medium Moisture)
                      </option>
                      <option
                        selected={
                          this.props.shampooSkeletonKey === "repair1" ? true : false
                        }
                        value="repair1"
                      >
                        Super Strength (Strong Moisture)
                      </option>
                      <option
                        selected={
                          this.props.shampooSkeletonKey === "smooth1" ? true : false
                        }
                        value="smooth1"
                      >
                        Smoothing 'Essential Shea' (Heavy)
                      </option>
                    </select>
                    <br />
                    <br />
                    BOOSTERS:
                    <br />
                    <br />
                    <form>
                      <div class="booster-container">
                        <div class="booster-list">
                          <input
                            type="checkbox"
                            name="pollution1"
                            value="pollution1"
                            checked={true}
                          />
                          Pollution Fighting
                          <br />
                          <input type="checkbox" name="uv1" value="uv1" />
                          Ultra Violet Protection
                          <br />
                          <input type="checkbox" name="water1" value="water1" />
                          Water Hardness
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash1"
                            value="afterwash1"
                          />
                          AfterWash1
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash2"
                            value="afterwash2"
                          />
                          AfterWash2
                          <br />
                          <input type="checkbox" name="age1" value="age1" />
                          Age
                          <br />
                          <input type="checkbox" name="diet1" value="diet1" />
                          Diet
                          <br />
                          <input type="checkbox" name="heat1" value="heat1" />
                          Heat Protection
                          <br />
                          <input
                            type="checkbox"
                            name="balancing1"
                            value="balancing1"
                          />
                          Scalp Balancing
                          <br />
                          <input
                            type="checkbox"
                            name="soothing1"
                            value="soothing1"
                          />
                          Scalp Soothing
                          <br />
                          <input
                            type="checkbox"
                            name="toning1"
                            value="toning1"
                          />
                          Scalp Toning
                        </div>

                        <div className="booster-list">
                          <input
                            type="checkbox"
                            name="texture1"
                            value="texture1"
                          />
                          Curly Textures
                          <br />
                          <input
                            type="checkbox"
                            name="volume2"
                            value="volume2"
                          />
                          Volume/Thickness
                          <br />
                          <input type="checkbox" name="color2" value="color2" />
                          Color Protection (Sun)
                          <br />
                          <input
                            type="checkbox"
                            name="moisture2"
                            value="moisture2"
                          />
                          Brilliant Shine Moisture
                          <br />
                          <input
                            type="checkbox"
                            name="repair2"
                            value="repair2"
                          />
                          Super Strength (Chemical)
                          <br />
                          <input
                            type="checkbox"
                            name="repair3"
                            value="repair3"
                          />
                          Super Strength (Protein for Diet)
                          <br />
                          <input
                            type="checkbox"
                            name="smooth2"
                            value="smooth2"
                          />
                          Smoothing <br />
                          <input type="checkbox" name="swim1" value="swim1" />
                          Frequent Swimming <br />
                        </div>
                      </div>
                    </form>
                  </div>
    )
}
