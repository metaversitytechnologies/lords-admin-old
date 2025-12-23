import React from "react";
import SearchUser from "./SearchUser";
import ReusableDatePicker from "./DatePicker";

interface BetListFiltersProps {
  sports: any[];
  markets: any[];
  sportId: string;
  marketName: string;
  oddsFrom: string;
  oddsTo: string;
  stakeFrom: string;
  stakeTo: string;
  userSearch: string;
  fromDate: Date | null;
  toDate: Date | null;
  activeTab: string;
  activeRadio: string;
  radioOptions: string[];
  onSportChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMarketChange: (value: string) => void;
  onOddsFromChange: (value: string) => void;
  onOddsToChange: (value: string) => void;
  onStakeFromChange: (value: string) => void;
  onStakeToChange: (value: string) => void;
  onUserSearchChange: (value: string) => void;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  onApply: () => void;
  onCancel: () => void;
  onRadioChange: (value: string) => void;
}

const BetListFilters: React.FC<BetListFiltersProps> = ({
  sports,
  markets,
  sportId,
  marketName,
  oddsFrom,
  oddsTo,
  stakeFrom,
  stakeTo,
  userSearch,
  fromDate,
  toDate,
  activeTab,
  activeRadio,
  radioOptions,
  onSportChange,
  onMarketChange,
  onOddsFromChange,
  onOddsToChange,
  onStakeFromChange,
  onStakeToChange,
  onUserSearchChange,
  onFromDateChange,
  onToDateChange,
  onApply,
  onCancel,
  onRadioChange
}) => {
  return (
    <form data-vv-scope="myBets" className="m-b-10">
      <div className="additional-filters m-t-10">
        <div className="row">
          <div className="col-sm-12">
            <div className="dropdown long-width d-inline-block v-t">
              <label className="p-l-5 d-block">Event</label>{" "}
              <select
                className="dropdown-toggle dropdown-button"
                value={sportId}
                onChange={onSportChange}
              >
                <option value="0">All</option>
                {sports.map((sport: any, index: number) => (
                  <option key={index} value={sport.id ?? sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div className="dropdown long-width m-l-10 d-inline-block v-t">
              <label className="p-l-5 d-block">Market Name</label>{" "}
              <select
                className="dropdown-toggle dropdown-button title"
                value={marketName}
                onChange={(e) => onMarketChange(e.target.value)}
              >
                <option value="all">All</option>
                {markets.length > 0 &&
                  markets.map((market: any, index: number) => (
                    <option key={index} value={market.id ?? market.name}>
                      {market.name}
                    </option>
                  ))}
              </select>
            </div>{" "}
            <div className="dropdown m-l-10 d-inline-block v-t">
              <label className="p-l-5 d-block">Rate</label>{" "}
              <button
                data-toggle="dropdown"
                className="dropdown-toggle dropdown-button"
              >
                <span className="title">Odds: All</span>{" "}
                <i className="fas fa-caret-down"></i>
              </button>{" "}
              <div className="dropdown-menu dropdown-date">
                <span className="p-t-10 p-l-10 p-r-10">From</span>{" "}
                <input
                  type="text"
                  className="p-t-10 p-l-10 p-r-10 p-b-10"
                  value={oddsFrom}
                  onChange={(e) => onOddsFromChange(e.target.value)}
                />
                <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>{" "}
                <input
                  type="text"
                  className="p-t-10 p-l-10 p-r-10 p-b-10"
                  value={oddsTo}
                  onChange={(e) => onOddsToChange(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="dropdown m-l-10 d-inline-block v-t">
              <label className="p-l-5 d-block">Amount</label>{" "}
              <button
                data-toggle="dropdown"
                className="dropdown-toggle dropdown-button"
              >
                <span className="title">Stake: All</span>{" "}
                <i className="fas fa-caret-down"></i>
              </button>{" "}
              <div className="dropdown-menu dropdown-date">
                <span className="p-t-10 p-l-10 p-r-10 p-b-10">From</span>{" "}
                <input
                  type="text"
                  className="p-t-10 p-l-10 p-r-10 p-b-10"
                  value={stakeFrom}
                  onChange={(e) => onStakeFromChange(e.target.value)}
                />{" "}
                <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>{" "}
                <input
                  type="text"
                  className="p-t-10 p-l-10 p-r-10 p-b-10"
                  value={stakeTo}
                  onChange={(e) => onStakeToChange(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="d-inline-block v-t m-l-10">
              <div className="search-box-container d-inline-block p-l-0 p-r-5">
                <label className="p-l-5 d-block">Search by user</label>{" "}
                <SearchUser value={userSearch} onChange={onUserSearchChange} />
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="row m-t-10">
          <div className="col-sm-12">
            {activeTab === "Past" && (
              <>
                <div className="d-inline-block v-t p-l-0 p-r-5 form-group m-b-0">
                  <label className="d-block p-l-5">From</label>{" "}
                  <ReusableDatePicker
                    selected={fromDate}
                    onChange={onFromDateChange}
                  />
                </div>
                <div className="form-group d-inline-block v-t p-l-0 p-r-5 m-b-0">
                  <label className="d-block p-l-5">To</label>{" "}
                  <ReusableDatePicker
                    selected={toDate}
                    onChange={onToDateChange}
                  />
                </div>
              </>
            )}

            <div className="text-right d-inline-block v-t p-l-0 p-r-5 m-b-0 form-group float-right">
              <label className="d-block p-l-5">&nbsp;</label>{" "}
              <button
                type="button"
                className="btn btn-secondary m-l-5"
                onClick={onApply}
              >
                Apply
              </button>{" "}
              <button
                type="button"
                className="btn btn-cancel m-l-5"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 m-b-10 p-l-0 p-r-0">
        <form data-vv-scope="myBets" className="m-b-10">
          <div className="form-group d-inline-block v-t m-b-0 p-l-0 p-r-0 bet-options">
            <fieldset className="form-group" id="__BVID__56">
              <div>
                <div
                  role="radiogroup"
                  tabIndex={-1}
                  className="bv-no-focus-ring"
                  id="__BVID__57"
                >
                  {radioOptions.map((option, index) => (
                    <div
                      key={index}
                      className="custom-control custom-control-inline custom-radio"
                    >
                      <input
                        type="radio"
                        name="radio-inline"
                        className="custom-control-input"
                        value={option}
                        id={`__BVID__57_BV_option_${index}`}
                        checked={activeRadio === option}
                        onChange={() => onRadioChange(option)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`__BVID__57_BV_option_${index}`}
                      >
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </form>
  );
};

export default BetListFilters;
