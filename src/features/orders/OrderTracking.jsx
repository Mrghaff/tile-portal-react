import { useState } from "react";

function normalizeDigits(value) {
  return value
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    .trim();
}

function formatFa(value) {
  return Number(value).toLocaleString("fa-IR");
}

function Steps({ oldOrder }) {
  return (
    <ol className="steps">
      <li className="done"><span className="step-dot">✓</span>ثبت سفارش</li>
      <li className="done"><span className="step-dot">✓</span>تأیید مالی</li>
      <li className={oldOrder ? "done" : "current"}>
        <span className="step-dot">{oldOrder ? "✓" : "۳"}</span>
        آماده بارگیری
      </li>
      <li className={oldOrder ? "done" : ""}>
        <span className="step-dot">{oldOrder ? "✓" : "۴"}</span>
        خروج بار
      </li>
    </ol>
  );
}

export default function OrderTracking({ onOpenCarriers }) {
  const [trackNumber, setTrackNumber] = useState("۱۰۴۲");
  const order = normalizeDigits(trackNumber);
  const oldOrder = order === "1038";
  const found = order === "1042" || oldOrder;

  return (
    <>
      <p className="note">شماره سفارش را وارد کنید. برای امتحان از ۱۰۴۲ یا ۱۰۳۸ استفاده کنید.</p>
      <form
        className="inline"
        onSubmit={(event) => {
          event.preventDefault();
          setTrackNumber(normalizeDigits(trackNumber));
        }}
      >
        <input
          aria-label="شماره سفارش"
          inputMode="numeric"
          onChange={(event) => setTrackNumber(event.target.value)}
          placeholder="مثلاً ۱۰۴۲"
          required
          value={trackNumber}
        />
        <button className="primary">پیگیری</button>
      </form>
      {found ? (
        <>
          <div className="item">
            <div className="row">
              <strong>سفارش {formatFa(order)}</strong>
              <span className="status">{oldOrder ? "تحویل به باربری" : "آماده بارگیری"}</span>
            </div>
            <p>
              {oldOrder ? "سرامیک کویر بژ · ۶۰ × ۶۰" : "سرامیک آریا روشن · ۶۰ × ۱۲۰"}
              <br />
              مقدار: {oldOrder ? "۴۸۰" : "۷۲۰"} مترمربع · مقصد: تهران
            </p>
            <Steps oldOrder={oldOrder} />
          </div>
          <div className="result">
            {oldOrder
              ? "بار از کارخانه خارج شده و به باربری تحویل داده شده است."
              : "اقدام بعدی: انتخاب باربری و معرفی خودرو برای هماهنگی بارگیری."}
          </div>
          {!oldOrder && (
            <button
              className="primary"
              onClick={onOpenCarriers}
              style={{ marginTop: 16 }}
              type="button"
            >
              انتخاب باربری
            </button>
          )}
        </>
      ) : (
        <div aria-live="polite" className="result">
          سفارشی با این شماره در اطلاعات نمونه پیدا نشد.
        </div>
      )}
      <p className="minor">اطلاعات نمایشی؛ متصل به کارخانه نیست.</p>
    </>
  );
}
