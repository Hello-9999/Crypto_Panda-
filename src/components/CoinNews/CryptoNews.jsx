import axios from "axios";
import React, { useEffect } from "react";
// import { CoinNEWS } from "../../Services/axios";
import { useState } from "react";
import { Card } from "antd";
import { News } from "../../Services/axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { RightOutlined } from "@ant-design/icons";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch } from "react-redux";
// import { limitedNews } from "../../slice/data.slice";

const CryptoNews = ({ Data, setDetailNews }) => {
  const [CoinNews, setCoinNews] = useState([]);
  const [StoreNews, setStoreNews] = useState([]);
  const dispatch = useDispatch();

  const { name } = useParams();
  // console.log(name, "nameer");

  // const getNews = async () => {
  //   const response = await News(name);
  //   console.log(response, "respmnce");
  //   // setCoinNews(response);
  //   // setStoreNews(response.articles.slice(0, 10));
  //   // dispatch(limitedNews(response.articles.slice(0, 5)));
  //   // dispatch(News(response.articles.slice(0, 10)))
  //   // setDetailNews(response.articles.slice(0,5))
  // };

  // console.log( [CoinNews.articles.slice(0,5) ] , 'newa')

  // console.log(StoreNews, "newsd");

  // useEffect(() => {
  //   getNews();
  // }, []);

  return (
    <>
      {CoinNews.status === "ok" ? (
        <>
          {}
          <div className="News container">
            <h6> {`News Related ${name}`}</h6>
            <div className="nes_div d-flex gap-4" style={{ flexWrap: "wrap" }}>
              {StoreNews.map((mapNews) => {
                return (
                  <>
                    <Card
                      hoverable="true"
                      cover={
                        <img
                          src={mapNews.urlToImage}
                          style={{ width: "100%", height: "200px" }}
                        />
                      }
                      style={{ width: "30%", cursor: "default" }}
                    >
                      <div className="date-author d-flex gap-2">
                        <Card.Meta description={<b>{mapNews.author}</b>} />
                        <Card.Meta
                          className="mb-2"
                          description={new Date(
                            mapNews.publishedAt
                          ).toDateString()}
                        />
                      </div>

                      <div className="card_News_TItle">
                        <h6>{mapNews.title}</h6>
                      </div>
                      <Card.Meta
                        description={
                          mapNews.description.length === 0 >= 100 ? (
                            <>{mapNews.description}</>
                          ) : (
                            <>
                              {" "}
                              {mapNews.description.slice(0, 200)} <b>...</b>
                            </>
                          )
                        }
                      />
                      <div className="news_footer mt-4">
                        <Link to={mapNews.url}>
                          <Button
                            fullWidth
                            style={{
                              textTransform: "capitalize",
                              textAlign: "left",
                            }}
                          >
                            Read More <NavigateNextIcon fontSize="small" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </>
                );
              })}
            </div>{" "}
          </div>
        </>
      ) : (
        <> loader </>
      )}
    </>
    // );
    // </>
  );
};

export default CryptoNews;

//  Task

// filter array
//  map for customize
// Word Count
//  char ciount
// jumping in clouds
