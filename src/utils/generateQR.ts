// Third-Party
import QRCode from 'qrcode';
/** ----------------------------------------------
   * @description Generate URL QR code using qrcode library.
   * @param {String} pathname Represent URL pathname, Whitout starting with a slash.
   * @returns {Promise} - Data URL representing the QR code image.
   * @throws {Error} - Throws an error if QR code generation fails.
   -------------------------------------------------*/
const generateQR = async (pathname: string): Promise<string> => {
  try {
    const QRSrc = await QRCode.toDataURL(pathname, { scale: 10 });
    return QRSrc;
  } catch (err) {
    console.error(`QR code generation failed: ${err.message}`);
    throw err;
  }
};

export default generateQR;
