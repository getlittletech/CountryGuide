import axios from 'axios'
import base64 from 'base-64'

/*
 * inspired by react-native-svg-image
 * however it just displays the contents from the web
 * we fetch the svg and convert into base64
 */

/*
 * flag is in an SVG format
 * we will fetch its contents and convert to html with an image
 */
export default async function getFlagHtml(flagUrl, flagDimensions) {

  try {
    const flagSvg = await axios.get(flagUrl)

    const svgOnly = flagSvg.data.substring(flagSvg.data.indexOf("<svg"))

    const flagHtml = createFlagHtml(svgOnly, flagDimensions)

    return flagHtml
  } catch (error) {
    console.log("Failed to get flag: ", error.message)
    return ""
  }
}

function createFlagHtml(flagSvg, flagDimensions) {
  const { width, height } = flagDimensions

  var flagSvg64 = "data:image/svg+xml;base64," + base64.encode(flagSvg)

  const html = `
      <!DOCTYPE html>\n
      <html>
        <head>
          <style type="text/css">
            img {
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            div {
              width: ${width ? width+'px' : 'auto'};
              height: ${height ? height+'px' : 'auto'};
            }
            body {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div>
            <img src="${flagSvg64}" align="middle" style="background-color: #e6e6e6;"/>
          </div>
        </body>
      </html>
    `;

  return html
}
