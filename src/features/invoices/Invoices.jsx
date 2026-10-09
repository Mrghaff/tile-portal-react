function formatFa(value) {
  return Number(value).toLocaleString("fa-IR");
}

export default function Invoices({ invoiceNumber, onOpenInvoice }) {
  if (invoiceNumber) {
    const oldInvoice = invoiceNumber === "1038";
    const amount = oldInvoice ? 480 : 720;
    const price = oldInvoice ? 380000 : 520000;

    return (
      <>
        <p className="note">
          همراه کاشی · خریدار: مشتری نمونه
          <br />
          این سند آزمایشی است و اعتبار مالی ندارد. مبالغ این نمونه بدون محاسبه مالیات و حمل‌اند.
        </p>
        <table className="invoice-table">
          <thead>
            <tr><th>شرح کالا</th><th>مترمربع</th><th>مبلغ واحد (تومان)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{oldInvoice ? "کویر بژ" : "آریا روشن"}</td>
              <td>{formatFa(amount)}</td>
              <td>{formatFa(price)}</td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <strong>جمع مبلغ کالا</strong>
          <span className="price">{formatFa(amount * price)} تومان</span>
        </div>
        <p className="note" style={{ marginTop: 15 }}>وضعیت: تسویه‌شده · مقصد: تهران</p>
        <button className="primary print-btn" onClick={() => window.print()} type="button">
          چاپ / ذخیره PDF
        </button>
      </>
    );
  }

  return (
    <>
      <p className="note">فاکتورهای نمونه را ببینید و نسخه قابل چاپ بگیرید.</p>
      {["1042", "1038"].map((number, index) => (
        <div className="item" key={number}>
          <div className="row">
            <strong>فاکتور {formatFa(number)}</strong>
            <span className="status">تسویه‌شده</span>
          </div>
          <p>{index ? "کویر بژ · ۴۸۰ مترمربع" : "آریا روشن · ۷۲۰ مترمربع"}</p>
          <div className="row">
            <span>{formatFa(index ? 182400000 : 374400000)} تومان</span>
            <button className="text-btn" onClick={() => onOpenInvoice(number)} type="button">
              مشاهده فاکتور ←
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
