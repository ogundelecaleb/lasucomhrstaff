import React from "react";

const BirthCertificate = ({data}) => {
  return (
    <div className="h-[700px]">
      {" "}
      <object
        data={data?.item.birth_certificate}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        {/* <p>
          Alternative text - include a link{" "}
          <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a>
        </p> */}
      </object>
    </div>
  );
};

export default BirthCertificate;
