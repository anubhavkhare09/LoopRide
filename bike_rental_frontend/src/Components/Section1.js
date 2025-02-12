import React from "react";

function Section1() {
  return (
    <div className="mycontainer my-5" style={{ margin: "5%" }}>
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1" style={{ color: " #6785dd" }}>
            Looprider
          </h2>
          <p className="mb-4 me-5 fs-5">
            Looprider is a globally renowned bike rental brand that has
            redefined mobility solutions in India. With a strong legacy dating
            back to 1990 in Los Angeles, California, DriveEase has become
            synonymous with reliable, convenient, and affordable travel
            experiences. DriveEase India has carried this legacy forward since
            its inception in 2010, offering world-class car rental services
            tailored to meet the diverse needs of travelers. Our extensive fleet
            of well-maintained veLooprider is a globally renowned bike rental
            brand that has revolutionized mobility solutions with its commitment
            to delivering exceptional travel experiences. Established in 1990 in
            Los Angeles, California, Looprider has become synonymous with
            adventure, reliability, and convenience. Since entering the Indian
            market in 2010, Looprider has transformed the way people commute and
            explore, offering a wide range of well-maintained bikes to cater to
            every travel need. With a seamless booking process, affordable
            pricing, and a strong presence across major cities, Looprider
            ensures that customers enjoy the freedom of the open road without
            any hassle. 
          </p>
          <button
            className="btn btn-dark mb-4"
            style={{ backgroundColor: " #6785dd" }}
          >
            Read More
          </button>
        </div>

        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/baner1.jpg"
              alt="Gym Transform"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
