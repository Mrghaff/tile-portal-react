export default function Destinations({ destinations, onAdd, onRemove }) {
  return (
    <>
      <p className="note">آدرس‌های این نمونه فقط در مرورگر خودتان ذخیره می‌شوند.</p>
      {destinations.length ? destinations.map((destination, index) => (
        <div className="item" key={`${destination.name}-${index}`}>
          <div className="row">
            <strong>{destination.name}</strong>
            <button
              aria-label={`حذف ${destination.name}`}
              className="text-btn danger"
              onClick={() => onRemove(index)}
              type="button"
            >
              حذف
            </button>
          </div>
          <p>{destination.address}<br />تحویل‌گیرنده: {destination.receiver}</p>
        </div>
      )) : <p className="note">هنوز مقصدی ثبت نکرده‌اید.</p>}
      <form onSubmit={onAdd}>
        <div className="field">
          <label htmlFor="address-name">عنوان مقصد</label>
          <input id="address-name" maxLength="60" name="name" placeholder="مثلاً انبار تهران" required />
        </div>
        <div className="field">
          <label htmlFor="address-text">آدرس کامل</label>
          <textarea id="address-text" maxLength="300" name="address" placeholder="شهر، خیابان و نشانی تحویل" required />
        </div>
        <div className="field">
          <label htmlFor="receiver">نام تحویل‌گیرنده</label>
          <input id="receiver" maxLength="60" name="receiver" required />
        </div>
        <button className="primary">افزودن مقصد</button>
      </form>
    </>
  );
}
