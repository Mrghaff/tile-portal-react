import Icon from "./Icon.jsx";

export default function Header({ onOpenSection }) {
  return (
    <>
      <header className="header">
        <a aria-label="همراه کاشی، خانه" className="brand" href="#">
          <span className="mark"><Icon name="grid" /></span>
          <span><strong>همراه کاشی</strong><small>پنل ارتباط با مشتریان</small></span>
        </a>
        <nav aria-label="منوی اصلی" className="nav">
          <button className="active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} type="button">خانه</button>
          <button onClick={() => onOpenSection("tracking")} type="button">سفارش‌های من</button>
          <button onClick={() => onOpenSection("quote")} type="button">محصولات</button>
          <button onClick={() => onOpenSection("support")} type="button">ارتباط با ما</button>
        </nav>
        <div className="account">
          <div className="avatar">م ک</div>
          <div><strong style={{ fontSize: 12 }}>مشتری گرامی</strong><small>حساب نمایشی</small></div>
        </div>
      </header>
      <nav aria-label="دسترسی موبایل" className="mobile-nav">
        <button className="active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} type="button"><Icon name="home" />خانه</button>
        <button onClick={() => onOpenSection("tracking")} type="button"><Icon name="box" />سفارش‌ها</button>
        <button onClick={() => onOpenSection("invoices")} type="button"><Icon name="bill" />فاکتورها</button>
        <button onClick={() => onOpenSection("support")} type="button"><Icon name="help" />پشتیبانی</button>
      </nav>
    </>
  );
}
