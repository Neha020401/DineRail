import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">RailFeast Express</h3>
          <p className="footer-description">
            Your one-stop solution for train ticket reservations and food ordering from station stores and onboard services.
          </p>
          <div className="footer-social">
            <Link
              href="#"
              className="social-icon"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              className="social-icon"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="#"
              className="social-icon"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              className="social-icon"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Ticket Services</h4>
          <ul className="footer-links">
            <li><Link href="/booking">Book Tickets</Link></li>
            <li><Link href="/pnr-status">PNR Status</Link></li>
            <li><Link href="/train-schedule">Train Schedule</Link></li>
            <li><Link href="/cancellations">Cancellations & Refunds</Link></li>
            <li><Link href="/seat-availability">Seat Availability</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Food Services</h4>
          <ul className="footer-links">
            <li><Link href="/station-food">Station Food Ordering</Link></li>
            <li><Link href="/onboard-meals">Onboard Meal Options</Link></li>
            <li><Link href="/special-meals">Special Diet Meals</Link></li>
            <li><Link href="/group-catering">Group Catering</Link></li>
            <li><Link href="/food-partners">Restaurant Partners</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Contact Us</h4>
          <address className="footer-contact">
            <p>
              <Phone size={16} className="contact-icon" /> Customer Support:{" "}
              <a href="tel:+18001234567">1-800-123-4567</a>
            </p>
            <p>
              <Mail size={16} className="contact-icon" />{" "}
              <a href="mailto:support@railfeast.com">support@railfeast.com</a>
            </p>
            <p>
              <MapPin size={16} className="contact-icon" /> 123 Railway Avenue, Train City
            </p>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-legal">
            <p className="copyright">© {new Date().getFullYear()} RailFeast Express. All rights reserved.</p>
            <ul className="legal-links">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
          <div className="footer-app">
            <p>Download our mobile app:</p>
            <div className="app-buttons">
              <Link href="#" className="app-button">
                <img src="/placeholder.svg?height=40&width=120" alt="Download on App Store" />
              </Link>
              <Link href="#" className="app-button">
                <img src="/placeholder.svg?height=40&width=120" alt="Get it on Google Play" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
