import React, { useEffect, useState } from "react";

export const Mars = () => {
  const [mars, setMars] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchMars = () => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMars(res.photos);
      });
  };

  useEffect(() => {
    fetchMars();
  }, [date]);
  console.log("mars", mars);
  return (
    <div style={{ marginTop: 30 }}>
      <iframe
        src="https://mars.nasa.gov/layout/embed/image/mslweather/"
        width="100%"
        height="700"
        scrolling="no"
        frameBorder="0"
      ></iframe>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="date"
          name=""
          id=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {mars.length > 0 ? (
          mars.map((item: any) => {
            return (
              <div
                key={item.id}
                style={{ width: 300, height: 300, padding: "30px 0" }}
              >
                <a href={item.img_src} target="_blank">
                  <img
                    src={item.img_src}
                    alt={item.img_src}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 30,
                    }}
                  />
                </a>
              </div>
            );
          })
        ) : (
          <div style={{ margin: "50px auto" }}>
            <p>No mars :(</p>
          </div>
        )}
      </div>
    </div>
  );
};
