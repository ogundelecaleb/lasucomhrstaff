import InboxMesaage from "./InboxMesaage";
import SentMessages from "./SentMessages";
import InitialFocus from "../../../components/ComposeMessage";
import DraftMessage from "./DraftMessage";
import ImportantMessages from "./ImportantMessages";
import { useState } from "react";
const Inbox = () => {
  const [page, setPage] = useState("Inbox");
  const navigate = (page) => {
    setPage(page);
  };
  const data = [];
  const reuseAbleBoxChildren = (
    bgColor,
    textColor,
    text,
    number,
    status,
    route
  ) => {
    return (
      <div
        onClick={() => navigate(text)}
        style={{ cursor: "pointer" }}
        className={`px-2 d-flex justify-content-between`}>
        <p className={`fw-${text === page ? "bold" : ""} fs-5`}>{text}</p>
        <p
          className='rounded-3 fs-6 px-2 fw-semibold py-1'
          style={{ backgroundColor: bgColor, color: textColor }}>
          {number}
        </p>
      </div>
    );
  };
  // const title = "compose";
  return (
    <div className='container-fluid'>
      <div className='row border-bottom'>
        <InitialFocus />
      </div>
      <div className='row px-5 mt-4' id='no-padding-res'>
        <div
          className='pt-4 col-lg-3 shadow rounded-3 p-2'
          style={{ height: "240px" }}>
          {reuseAbleBoxChildren("#B9B5C0", "dark", "Inbox", 0, true)}
          {reuseAbleBoxChildren("#CAA1BB", "#B1749A", "Sent", 0)}
          {reuseAbleBoxChildren("#BAE69F", "#86D357", "Important", 0)}
          {reuseAbleBoxChildren("#FFB3B3", "#FF5959", "Draft", 0)}
        </div>
        <div className='col-lg-9'>
          {page === "Inbox" && <InboxMesaage data={data} />}
          {page === "Sent" && <SentMessages data={data} />}
          {page === "Draft" && <DraftMessage data={data} />}
          {page === "Important" && <ImportantMessages data={data} />}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
