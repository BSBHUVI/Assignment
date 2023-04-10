import React from "react";

export default function SelectedTable(props) {
  let headers;

  if (props.dataSource === undefined || props.dataSource.length === 0)
    return <></>;
  else {
    headers = Object.keys(props.dataSource[0]).slice(0,4);
    return (
      <div>
      
          <h1>selected rows are : </h1>
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {props.dataSource.map((rec, idx) => (
              <tr key={idx}>
                {headers.map((h, i) => (
                  <td key={i}>{rec[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
