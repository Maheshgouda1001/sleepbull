import Container from "./Container";

export default function TopBar() {
  return (
    <div className="hidden bg-slate-900 py-2 text-sm text-white lg:block">
      <Container>
        <div className="flex items-center justify-between">

          <p>
            🚚 Free Shipping Across India
          </p>

          <div className="flex gap-6">

            <span>📞 +91 9876543210</span>

            <span>✉ support@sleepbull.com</span>

          </div>

        </div>
      </Container>
    </div>
  );
}