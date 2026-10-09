import { useState } from "react";
import "./App.css";

export default function App() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <main className="shell" dir="rtl">
      <div className="intro">
        <h1>همراه کاشی</h1>
      </div>

      <section className="services">
        <button
          className="card"
          onClick={() => setShowOrder(!showOrder)}
          aria-expanded={showOrder}
          aria-controls="order-details"
        >
          <h3>پیگیری سفارش</h3>
          <p>مشاهده وضعیت سفارش شما</p>
        </button>
      </section>

      {showOrder && (
        <section id="order-details" className="panel">
          <h2>سفارش ۱۰۴۲</h2>
          <p>وضعیت: آماده بارگیری</p>
        </section>
      )}
    </main>
  );
}