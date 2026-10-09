import { useEffect, useState } from "react";
import Destinations from "./features/destinations/Destinations.jsx";
import Invoices from "./features/invoices/Invoices.jsx";
import OrderTracking from "./features/orders/OrderTracking.jsx";
import Header from "./components/Header.jsx";
import Icon, { IconSprite } from "./components/Icon.jsx";
import Modal from "./components/Modal.jsx";
import ServiceCard from "./components/ServiceCard.jsx";
import { getStoredList, storeList } from "./services/api.js";

const products = [
  { name: "آریا روشن", size: "۶۰ × ۱۲۰", price: 520000, discount: 12, stock: 1440 },
  { name: "کویر بژ", size: "۶۰ × ۶۰", price: 380000, discount: 8, stock: 960 },
];

const services = [
  ["tracking", "box", "پیگیری سفارش", "از ثبت سفارش تا خروج بار، باخبر باشید.", "۱ سفارش فعال", "مشاهده وضعیت سفارش"],
  ["invoices", "bill", "فاکتورهای من", "فاکتورها و وضعیت پرداخت، یک‌جا.", "۲ فاکتور", "مشاهده و دریافت فاکتور"],
  ["destinations", "pin", "مقصدهای من", "آدرس‌های تحویل را یک‌بار ثبت کنید.", "", "مدیریت آدرس‌ها"],
  ["offers", "tag", "تخفیف امروز", "پیشنهادهای ویژه برای خرید بعدی شما.", "تا ۱۲٪ تخفیف", "دیدن پیشنهادهای امروز"],
  ["carriers", "truck", "باربری‌ها", "انتخاب باربری و هماهنگی ارسال بار.", "", "مشاهده باربری‌ها"],
  ["quote", "search", "استعلام قیمت و موجودی", "کالای موردنظرتان را راحت پیدا کنید.", "", "جست‌وجو در محصولات"],
];

const carriers = [
  ["باربری مسیر کویر", "یزد ← تهران، کرج", "تریلی کفی و چادری"],
  ["باربری راه آریا", "یزد ← اصفهان، شیراز", "حمل بین‌شهری"],
  ["باربری همراه بار", "یزد ← مشهد، تبریز", "حمل بار کامل"],
];

const defaultDestinations = [
  {
    name: "انبار مرکزی تهران",
    address: "تهران، شهرک صنعتی شمس‌آباد، انبار نمونه",
    receiver: "مسئول انبار",
  },
];

function formatFa(value) {
  return Number(value).toLocaleString("fa-IR");
}

function Offers({ onQuote }) {
  return (
    <>
      <p className="note">پیشنهادهای آزمایشی؛ قیمت‌ها به‌ازای هر مترمربع و بدون مالیات و حمل هستند.</p>
      {products.map((product, index) => (
        <div className="item" key={product.name}>
          <div aria-hidden="true" className={`swatch ${index ? "sand" : ""}`} />
          <div className="row">
            <strong>{product.name} · {product.size}</strong>
            <span className="badge">{formatFa(product.discount)}٪ تخفیف</span>
          </div>
          <p><del>{formatFa(product.price)}</del> تومان</p>
          <div className="row">
            <span className="price">{formatFa(product.price * (1 - product.discount / 100))} تومان</span>
            <button className="text-btn" onClick={() => onQuote(index)} type="button">درخواست خرید ←</button>
          </div>
        </div>
      ))}
    </>
  );
}

function QuoteForm({ destinations, initialProduct = 0, onAddDestination, onNotify }) {
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState("100");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState("");
  const product = products[selectedProduct];

  function submit(event) {
    event.preventDefault();
    const amount = Number(quantity);
    const requests = getStoredList("tile-requests");
    requests.push({
      id: Date.now(),
      product: product.name,
      quantity: amount,
      destination: destinations[Number(destination)]?.name,
    });
    const saved = storeList("tile-requests", requests);
    if (!saved) onNotify("ذخیره در این مرورگر ممکن نشد؛ درخواست فقط در همین صفحه ثبت شد.");
    setResult(
      `درخواست ${formatFa(amount)} مترمربع ${product.name} ${
        saved ? "در این مرورگر ذخیره شد" : "در همین صفحه ثبت شد"
      }. هیچ سفارشی برای کارخانه ارسال نشده است.`,
    );
  }

  return (
    <>
      <p className="note">قیمت و موجودی نمونه‌اند. درخواست شما فقط در این مرورگر ثبت می‌شود و برای کارخانه ارسال نمی‌شود.</p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="product">انتخاب محصول</label>
          <select id="product" onChange={(event) => setSelectedProduct(Number(event.target.value))} value={selectedProduct}>
            {products.map((item, index) => (
              <option key={item.name} value={index}>{item.name} · {item.size}</option>
            ))}
          </select>
        </div>
        <div className="item">
          <div className="row">
            <strong>{formatFa(product.price)} تومان / مترمربع</strong>
            <span className="status">موجودی نمونه: {formatFa(product.stock)} متر</span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="quantity">مقدار موردنیاز (مترمربع)</label>
          <input
            id="quantity"
            max={product.stock}
            min="1"
            onChange={(event) => setQuantity(event.target.value)}
            required
            step="1"
            type="number"
            value={quantity}
          />
        </div>
        <div className="field">
          <label htmlFor="quote-destination">مقصد تحویل</label>
          <select
            id="quote-destination"
            onChange={(event) => setDestination(event.target.value)}
            required
            value={destination}
          >
            <option value="">انتخاب مقصد</option>
            {destinations.map((item, index) => (
              <option key={`${item.name}-${index}`} value={index}>{item.name}</option>
            ))}
          </select>
          <button className="text-btn" onClick={onAddDestination} type="button">افزودن مقصد جدید</button>
        </div>
        <div className="result">
          برآورد مبلغ کالا: {formatFa(Math.max(0, Number(quantity)) * product.price)} تومان؛ قیمت پایه، پیش از تخفیف و هزینه‌های جانبی.
        </div>
        <button className="primary" style={{ marginTop: 16 }}>ثبت درخواست آزمایشی</button>
        {result && <div aria-live="polite" className="result">{result}</div>}
      </form>
    </>
  );
}

function Carriers({ choice, onSelect }) {
  return (
    <>
      <p className="note">شرکت‌های زیر فرضی‌اند. انتخاب شما برای هماهنگی سفارش نمونه ۱۰۴۲ در این مرورگر ذخیره می‌شود؛ خودرو رزرو نمی‌شود.</p>
      {carriers.map(([name, route, type], index) => (
        <div className="item" key={name}>
          <div className="row"><strong>{name}</strong><Icon name="truck" /></div>
          <p>{route}<br />{type} · کرایه پس از هماهنگی</p>
          <button className="text-btn" onClick={() => onSelect(index)} type="button">
            انتخاب برای سفارش ۱۰۴۲ ←
          </button>
        </div>
      ))}
      {choice && <div aria-live="polite" className="result">انتخاب فعلی: {choice} · در انتظار هماهنگی (نمونه)</div>}
    </>
  );
}

function Support({ onSubmit, result }) {
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(String(formData.get("subject")), message.trim());
    setMessage("");
  }

  return (
    <>
      <p className="note">پیام در این نمونه فقط روی مرورگر شما ذخیره می‌شود و به واحد فروش ارسال نمی‌شود.</p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="subject">موضوع</label>
          <select id="subject" name="subject">
            <option>پیگیری سفارش</option>
            <option>قیمت و موجودی</option>
            <option>هماهنگی حمل</option>
            <option>سایر موارد</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">پیام شما</label>
          <textarea
            id="message"
            maxLength="1000"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="توضیح کوتاهی درباره درخواستتان بنویسید..."
            required
            value={message}
          />
        </div>
        <button className="primary">ذخیره پیام آزمایشی</button>
        {result && <div aria-live="polite" className="result">{result}</div>}
      </form>
    </>
  );
}

export default function App() {
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [destinations, setDestinations] = useState(() =>
    getStoredList("tile-destinations", defaultDestinations),
  );
  const [carrierChoice, setCarrierChoice] = useState(() =>
    getStoredList("tile-carrier")[0] ?? "",
  );
  const [supportResult, setSupportResult] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function openSection(section, extra = {}) {
    if (section === "support") setSupportResult("");
    setModal({ section, ...extra });
  }

  function saveDestinations(next) {
    setDestinations(next);
    if (!storeList("tile-destinations", next)) {
      setToast("ذخیره در این مرورگر ممکن نشد؛ اطلاعات فقط در همین صفحه می‌ماند.");
      return false;
    }
    return true;
  }

  function addDestination(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = [
      ...destinations,
      {
        name: String(data.get("name")).trim(),
        address: String(data.get("address")).trim(),
        receiver: String(data.get("receiver")).trim(),
      },
    ];
    const saved = saveDestinations(next);
    form.reset();
    if (saved) setToast("مقصد در این مرورگر ذخیره شد.");
  }

  function removeDestination(index) {
    saveDestinations(destinations.filter((_, itemIndex) => itemIndex !== index));
  }

  function selectCarrier(index) {
    const name = carriers[index][0];
    setCarrierChoice(name);
    if (!storeList("tile-carrier", [name])) {
      setToast("ذخیره در این مرورگر ممکن نشد؛ انتخاب فقط در همین صفحه می‌ماند.");
    }
  }

  function submitSupport(subject, message) {
    const messages = getStoredList("tile-messages");
    messages.push({ subject, message });
    const saved = storeList("tile-messages", messages);
    if (!saved) setToast("ذخیره در این مرورگر ممکن نشد؛ پیام فقط در همین صفحه می‌ماند.");
    setSupportResult(
      `${saved ? "پیام در این مرورگر ذخیره شد." : "پیام فقط در همین صفحه ثبت شد."} پیامی به فروش ارسال نشده است.`,
    );
  }

  function modalContent() {
    switch (modal?.section) {
      case "tracking":
        return <OrderTracking onOpenCarriers={() => openSection("carriers")} />;
      case "invoices":
        return <Invoices onOpenInvoice={(number) => setModal({ section: "invoice", number })} />;
      case "invoice":
        return <Invoices invoiceNumber={modal.number} />;
      case "destinations":
        return (
          <Destinations
            destinations={destinations}
            onAdd={addDestination}
            onRemove={removeDestination}
          />
        );
      case "offers":
        return <Offers onQuote={(product) => openSection("quote", { product })} />;
      case "quote":
        return (
          <QuoteForm
            destinations={destinations}
            initialProduct={modal.product}
            onAddDestination={() => openSection("destinations")}
            onNotify={setToast}
          />
        );
      case "carriers":
        return <Carriers choice={carrierChoice} onSelect={selectCarrier} />;
      case "support":
        return <Support onSubmit={submitSupport} result={supportResult} />;
      default:
        return null;
    }
  }

  const modalTitles = {
    tracking: "پیگیری سفارش",
    invoices: "فاکتورهای من",
    invoice: `فاکتور نمونه ${formatFa(modal?.number ?? "")}`,
    destinations: "مقصدهای من",
    offers: "تخفیف امروز",
    quote: "استعلام قیمت و موجودی",
    carriers: "باربری‌ها",
    support: "ارتباط با فروش",
  };

  return (
    <>
      <IconSprite />
      <div className="shell">
        <Header onOpenSection={openSection} />
        <main>
          <div className="intro">
            <div><p className="eyebrow">به همراه کاشی خوش آمدید</p><h1>همه‌چیز، در دسترس شما.</h1></div>
            <span className="demo"><span className="dot" />نسخه نمایشی</span>
          </div>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><Icon name="grid" style={{ width: 15, height: 15 }} />از انتخاب تا تحویل، همراه شما</div>
              <h2>سفارش شما، یک قدم نزدیک‌تر.</h2>
              <p>پیگیری سفارش، دریافت فاکتور و هماهنگی حمل؛ ساده و یک‌جا.</p>
              <button className="primary" onClick={() => openSection("tracking")} type="button">
                پیگیری سفارش من <Icon name="arrow" />
              </button>
            </div>
            <div aria-hidden="true" className="tile-art">
              {Array.from({ length: 9 }, (_, index) => <i className="tile" key={index} />)}
            </div>
          </section>

          <div className="section-title"><h2>امروز چه کاری دارید؟</h2><p>دسترسی سریع به خدمات شما</p></div>
          <section aria-label="خدمات مشتریان" className="services">
            {services.map(([key, icon, title, description, badge, action]) => (
              <ServiceCard
                action={action}
                badge={badge}
                description={description}
                featured={key === "offers"}
                icon={icon}
                key={key}
                onClick={() => openSection(key)}
                title={title}
              />
            ))}
          </section>

          <section className="lower">
            <div className="panel">
              <div className="panel-top">
                <h2>آخرین سفارش شما</h2>
                <button className="text-btn" onClick={() => openSection("tracking")} type="button">
                  جزئیات سفارش <Icon name="arrow" />
                </button>
              </div>
              <div className="order-info">
                <div><strong>سرامیک آریا روشن · ۶۰ × ۱۲۰</strong><p>سفارش ۱۰۴۲ · ۷۲۰ مترمربع · مقصد: تهران</p></div>
                <span className="status">آماده بارگیری</span>
              </div>
              <ol className="steps">
                <li className="done"><span className="step-dot">✓</span>ثبت سفارش</li>
                <li className="done"><span className="step-dot">✓</span>تأیید مالی</li>
                <li className="current"><span className="step-dot">۳</span>آماده بارگیری</li>
                <li><span className="step-dot">۴</span>خروج بار</li>
              </ol>
            </div>
            <aside className="panel help">
              <span className="iconbox"><Icon name="help" /></span>
              <h2>برای هماهنگی، کنار شما هستیم.</h2>
              <p>درباره سفارش یا ارسال سؤال دارید؟<br />درخواستتان را برای واحد فروش بنویسید.</p>
              <button className="text-btn" onClick={() => openSection("support")} type="button">
                ارتباط با فروش <Icon name="arrow" />
              </button>
            </aside>
          </section>
        </main>
        <footer className="footer">
          <span>همراه کاشی؛ مسیر ساده‌تر خرید و تحویل</span>
          <span>تمام قیمت‌ها، سفارش‌ها و شرکت‌ها در این نمونه آزمایشی‌اند.</span>
        </footer>
      </div>
      {modal && (
        <Modal onClose={() => setModal(null)} title={modalTitles[modal.section]}>
          {modalContent()}
        </Modal>
      )}
      <div aria-live="polite" className="toast" role="status">{toast}</div>
    </>
  );
}
