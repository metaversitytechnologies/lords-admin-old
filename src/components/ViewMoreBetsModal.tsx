import React, { useState } from "react";
import ReusableModal from "./ReusableModal";

interface IpDetails {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

const ViewMoreBetsModal: React.FC = () => {
  const [isIpModalOpen, setIpModalOpen] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);

  const handleIpModalOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // In a real app, you would fetch this data from an API based on the IP address
    const sampleIpDetails: IpDetails = {
      status: "success",
      country: "Sweden",
      countryCode: "SE",
      region: "G",
      regionName: "Kronoberg County",
      city: "Vaxjo",
      zip: "352 48",
      lat: 56.8746,
      lon: 14.8124,
      timezone: "Europe/Stockholm",
      isp: "Ziqito Limited",
      org: "VoiceTech Sweden AB",
      as: "AS35100 Patrik Lagerman",
      query: "31.44.238.25"
    };
    setIpDetails(sampleIpDetails);
    setIpModalOpen(true);
  };

  const handleIpModalClose = () => {
    setIpModalOpen(false);
    setIpDetails(null);
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="form-group m-t-5 m-b-5 col-md-2 p-r-5">
            <label className="p-l-5">Search by user</label>
            <div className="search-box-container">
              <input
                type="text"
                name="uname"
                placeholder="Enter Atleast 3 character"
                autoComplete="off"
                className="form-control d-inline-block"
              />
            </div>
          </div>
          <div className="form-group m-t-5 m-b-5 col-md-2 p-l-0 p-r-5">
            <label className="p-l-5">IP Address</label>
            <input
              type="text"
              name="ip"
              placeholder="IP Address"
              className="form-control d-inline-block"
            />
          </div>
          <div className="form-group m-t-5 m-b-5 col-md-4 ip-address p-l-0 p-r-5">
            <label className="p-l-5 d-block">Amount</label>
            <input
              type="text"
              name="fromamt"
              placeholder="From Amount"
              className="form-control d-inline-block"
            />
            <span>-</span>
            <input
              type="text"
              name="toamt"
              placeholder="To Amount"
              className="form-control d-inline-block"
            />
          </div>
          <div className="form-group m-t-5 m-b-5 col-md-2 type p-l-0 p-r-5">
            <label className="p-l-5">Type</label>
            <select name="bettype" className="form-control d-inline-block">
              <option value="">All</option>
              <option value="back">Back</option>
              <option value="lay">Lay</option>
            </select>
          </div>
          <div className="col-md-2 m-t-5 text-right p-l-0 p-r-15">
            <label className="p-l-5 d-block">&nbsp;</label>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <button type="button" className="btn btn-danger">
              Reset
            </button>
          </div>
          <div className="col-md-12 m-t-5 text-right p-l-0 p-r-15">
            <div id="export_1763228181671" className="d-inline-block m-l-5">
              <span className="btn btn-secondary m-l-5">Download CSV</span>
            </div>
          </div>
        </div>
      </form>
      <div className="table-responsive matched-data">
        <table className="table matched-data">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Market Name</th>
              <th>Nation</th>
              <th>Type</th>
              <th>User Rate</th>
              <th>Amount</th>
              <th>Win/Loss</th>
              <th>Currency</th>
              <th>Place Date</th>
              <th>Match Date</th>
              <th>IP</th>
              <th>Browser Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="back">
              <td>1</td>
              <td>
                clishak
                <a title="User Detail" href="#" target="_self" className="">
                  <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                </a>
              </td>
              <td>lucky15</td>
              <td>0 Runs</td>
              <td>BACK</td>
              <td>4.53</td>
              <td>100.00</td>
              <td>
                <span className="text-danger">-100.00</span>
              </td>
              <td>INR</td>
              <td>2025-11-02 12:21:57</td>
              <td>2025-11-02 12:21:57</td>
              <td>
                119.252.202.193
                <a
                  title="IP Details"
                  href="#"
                  target="_self"
                  className=""
                  onClick={handleIpModalOpen}
                >
                  <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                </a>
              </td>
              <td>
                <a
                  href="javascript:void(0)"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"
                  className="text-success"
                >
                  Detail
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReusableModal
        show={isIpModalOpen}
        handleClose={handleIpModalClose}
        title="IP Details"
      >
        {ipDetails ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ipDetails).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading IP details...</p>
        )}
      </ReusableModal>
    </div>
  );
};

export default ViewMoreBetsModal;
