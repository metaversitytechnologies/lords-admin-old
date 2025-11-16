/**
 * Live TV drag placeholder (keeps all resizer sticks).
 */
const LiveTvDrag = () => (
  <div title="Drag" className="livetv-drag d-none">
    <div className="vdr inactive" style={{ zIndex: "auto", top: 0, left: 0 }}>
      <div className="content-container" style={{ width: 350, height: 200 }}>
        <div></div>
      </div>

      <div
        className="vdr-stick vdr-stick-tl not-resizable"
        style={{ width: 8, height: 8, top: -4, left: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-tm not-resizable"
        style={{ width: 8, height: 8, top: -4, marginLeft: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-tr not-resizable"
        style={{ width: 8, height: 8, top: -4, right: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-mr not-resizable"
        style={{ width: 8, height: 8, marginTop: -4, right: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-br not-resizable"
        style={{ width: 8, height: 8, bottom: -4, right: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-bm not-resizable"
        style={{ width: 8, height: 8, bottom: -4, marginLeft: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-bl not-resizable"
        style={{ width: 8, height: 8, bottom: -4, left: -4 }}
      ></div>
      <div
        className="vdr-stick vdr-stick-ml not-resizable"
        style={{ width: 8, height: 8, marginTop: -4, left: -4 }}
      ></div>
    </div>
  </div>
);

export default LiveTvDrag;
