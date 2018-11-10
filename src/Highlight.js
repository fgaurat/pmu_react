import React from 'react';


function Highlight(props){
  const arrive = props.arrive;
  const data = props.data;
  const out = {};
  
  for (const d of data) {
    out[d] = false;
    if (arrive.slice(0, 3).includes(d)) {
      out[d] = true;
    }
  }

  const values = data.map((d, i) => {
    const sep = i + 1 === data.length ? '' : ', ';
    // console.log(props,out);
    if (out[d]) {
      return (
        <mark key={i}>{d}{sep}</mark>
      );
    } else {
      return (
        <span key={i}>{d}{sep}</span>
      );
    }
  });

  return <div className="Highlight">{values}</div>;

}


export default Highlight;
