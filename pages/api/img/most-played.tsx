import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import queryString from "query-string";
// import { theme } from "styles/theme";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const game = searchParams.get("game");
  const count = searchParams.get("count");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const objectId = searchParams.get("objectId");
  const username = searchParams.get("username");

  //   const getRubikBold = await fetch(
  //     new URL("fonts/Rubik-Bold.ttf", import.meta.url).href
  //   ).then((res) => res.arrayBuffer());

  //   const getRubikLight = await fetch(
  //     new URL("fonts/Rubik-Light.ttf", import.meta.url).href
  //   ).then((res) => res.arrayBuffer());

  const imgUrl = queryString.stringifyUrl({
    url: `https://dev.aintboard.com/api/bgg/get-thing`,
    query: {
      id: objectId,
    },
  });

  const imgData = await fetch(imgUrl);
  const imgResponse = await imgData?.json();

  const parsedImgData = JSON.parse(imgResponse);

  const bgImg =
    parsedImgData?.items?.[0]?.item?.[0]?.thumbnail?.[0]?._text?.[0];
  
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "white",
          width: "100%",
          height: "100%",
          padding: 24,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `10px solid green`,
          gap: 0,
          background:
            "linear-gradient(180deg, rgba(43,64,64,1) 0%, rgba(43,64,64,1) 35%, rgba(19,19,19,1) 100%)",
        }}
      >
        <span
          style={{
            position: "absolute",
            color: "white",
            fontSize: "16px",
            top: "1rem",
            right: "1rem",
          }}
        >
          aintboard.org
        </span>
        <div
          style={{
            display: "flex",
            width: "100%",
            whiteSpace: "normal",
            alignItems: "center",
            justifyContent: "center",
            fontSize: `15px`,
            gap: "2rem",
          }}
        >
          {/* <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/img/logo_gray.png`}
            width={100}
            height={100}
            alt="Aintboard"
          /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span style={{ textAlign: "center" }}>My most played game</span>
            <div
              style={{
                textAlign: "center",
                fontSize: `12px`,
                display: "block",
                justifySelf: "center",
                alignSelf: "center",
                margin: "0 auto",
              }}
            >
              {username}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            margin: 0,
            // margin: '10px 0',
            padding: 0,
            maxHeight: "13rem",
          }}
        >
          <img
            src={bgImg}
            alt={game ?? ""}
            width={180}
            height={180}
            style={{
              imageRendering: "auto",
            }}
          />
          <h1
            style={{
              fontSize: "1.5rem",
              color: `red`,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              textOverflow: "ellipsis",
              maxWidth: "15rem",
            }}
          >
            {game}
          </h1>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: `16px`,
          }}
        >
          I played it for {count} times!
        </h2>
        <span
          style={{
            textAlign: "center",
            fontSize: `16px`,
          }}
        >
          from {startDate} - {endDate}
        </span>
      </div>
    ),
    {
      width: 768,
      height: 432,
    }
  );
}
