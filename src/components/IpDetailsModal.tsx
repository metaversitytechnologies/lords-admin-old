import React from "react";
import ReusableModal from "./ReusableModal";

export interface IpDetails {
  status: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  query: string;
  message?: string;
}

interface IpDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  ipDetails: IpDetails | null;
}

const IpDetailsModal: React.FC<IpDetailsModalProps> = ({
  show,
  handleClose,
  ipDetails
}) => {
  return (
    <ReusableModal
      position="top"
      show={show}
      handleClose={handleClose}
      title="IP Details"
    >
      {ipDetails ? (
        ipDetails.status === "fail" ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>status</td>
                <td>{ipDetails.status}</td>
              </tr>
              {ipDetails.message && (
                <tr>
                  <td>message</td>
                  <td>{ipDetails.message}</td>
                </tr>
              )}
              <tr>
                <td>query</td>
                <td>{ipDetails.query}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ipDetails).map(
                ([key, value]) =>
                  value && (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )
      ) : (
        <p>Loading IP details...</p>
      )}
    </ReusableModal>
  );
};

export default IpDetailsModal;
