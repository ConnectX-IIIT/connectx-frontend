import React from "react";
import UpImg from "../../assets/_general/sort/individual/ic_sort_l.svg";
import DownImg from "../../assets/_general/sort/individual/ic_sort_r.svg";

function SortComponent() {
  return (
    <div className="grid mb-3" style={{ gridTemplateColumns: "80.5% 19.5%" }}>
      <div
        className="my-auto"
        style={{
          borderTop: "1px solid #BDBFC4",
        }}
      ></div>
      <div className="flex">
        <span
          className="font-medium text-sm ml-2.5 cursor-pointer mr-1"
          style={{ color: "#555555" }}
        >
          Sort by : Popularity
        </span>
        <img
          src={UpImg}
          alt="sort"
          className="mr-0.5 transform translate-y-0.5"
        />
        <img src={DownImg} alt="sort" className="transform -translate-y-0.5" />
      </div>
    </div>
  );
}

export default SortComponent;
