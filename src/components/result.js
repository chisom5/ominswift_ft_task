import React, { useState } from "react";
import { Modal } from "antd";
import "./componentStyle.css";

const ViewResultComponent = (props) => {
  const [tableResult] = useState([
    "S/N",
    "Course Code",
    "Course Title",
    "Unit",
    "Grade",
    "Total Point",
  ]);
  const [tableCGP] = useState([
    "UNTS",
    "Untd",
    "Gpts",
    "Gptd",
    "Gpats",
    "Gpatd",
  ]);
  return (
    <Modal
      title={null}
      style={{ top: 20 }}
      visible={props.visible}
      closable={false}
      onCancel={() => props.dismissModal()}
      destroyOnClose
      footer={null}
      width={"60%"}
    >
      <div className="modalContent">
        <header className="modalContent-wrapper-header">
          <div>
            <img src={props.viewResult?.logo} alt="logo" />
          </div>

          <div className="header_center">
            <h4>FREMONT COLLEGE OF EDUCATION</h4>
            <span>
              No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
            </span>
            <h3>Post Graduate Diploma in Education</h3>
            <p>Student First Semester Statement Of Result</p>
          </div>

          <div>
            <img
              src={props.viewResult?.profile_picture}
              alt="profile_picture"
            />
          </div>
        </header>
        <section className="modalContent-wrapper-forProfile">
          <div className="forProfile-row">
            <div>
              <p className="forProfile-row-label">Name:</p>
              <span className="forProfile-row-value">{`${props.viewResult?.data.firstname} ${props.viewResult?.data.surname}`}</span>
            </div>

            <div>
              <p className="forProfile-row-label">Reg. No.:</p>
              <span className="forProfile-row-value">
                {props.viewResult?.data.reg_no}
              </span>
            </div>
          </div>
          <div className="forProfile-row">
            <div>
              <p className="forProfile-row-label">Level:</p>
              <span className="forProfile-row-value">
                {props.viewResult?.data.level}
              </span>
            </div>

            <div>
              <p className="forProfile-row-label">Session:</p>
              <span className="forProfile-row-value">
                {props.viewResult?.data.session}
              </span>
            </div>
          </div>
        </section>

        <div className="table_fullWidth">
          <table>
            <thead>
              <tr>
                {tableResult?.map((head) => {
                  return <th>{head}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.viewResult?.data.result?.map((item, i) => {
                return (
                  <tr key={item.coursecode}>
                    <td>{`${i + 1}.`}</td>
                    <td>{item.coursecode}</td>
                    <td>{item.title}</td>
                    <td>{item.credit_unit}</td>
                    <td>{item.grade}</td>
                    <td>{item.total_point}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table_small">
          <table>
            <thead>
              <tr>
                {tableCGP?.map((head) => {
                  return <th>{head}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.viewResult?.data.cummulative.unts}</td>
                <td>{props.viewResult?.data.cummulative.untd}</td>
                <td>{props.viewResult?.data.cummulative.gpts}</td>
                <td>{props.viewResult?.data.cummulative.gptd}</td>
                <td>{props.viewResult?.data.cummulative.gpats}</td>
                <td>{props.viewResult?.data.cummulative.gpatd}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="forRemark">
          <p className="forRemark-label">Remarks:</p>
          <span className="forRemark-value">
            {props.viewResult?.data.cummulative.remarks}
          </span>
        </div>

        <div className="registrar-container">
          <div className="registrar-line" />
          <p>Registrar</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewResultComponent;
