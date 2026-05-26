import { IconClockHour4, IconHeadphones, IconMail, IconPhone } from "@tabler/icons-react";
import { MapPin, MessageSquare, Shield } from "lucide-react";

export interface Form {
    id: number
    label: string
    placeholder: string
}

export interface contactInfo {
    id: number
    label: string
    item1: string
    item2: string
    details: string
    Icon: React.ComponentType<{className?: string}>; 
}

export interface service {
    id: number
    label: string
    details: string
    Icon: React.ComponentType<{className?: string}>
}

export interface faq {
    id: number
    question: string
    answer: string
}

export interface button {
    id: number
    text: string
    Icon: React.ComponentType<{className?: string, size?: number}>
}

export const contacts: contactInfo[] = [
    {
        id: 1, 
        label: "Email Us", 
        item1: "hello@bloomshop.com", 
        item2: "support@bloomshop.com", 
        details: "send us an email anytime", 
        Icon: IconMail
    }, 

    {
        id: 2, 
        label: "Call Us", 
        item1: "+1 (555) 123-4567", 
        item2: "+1 (555) 987-6543", 
        details: "Mon-Fri from 8am to 5pm",
        Icon: IconPhone
    }, 

    {
        id: 3, 
        label: "Visit Us",
        item1: "123 Fashion Street", 
        item2: "Style City, SC 12345",
        details: "Come say hello at our office", 
        Icon: MapPin 
    }, 

    {
        id: 4, 
        label: "Working Hours",
        item1: "Monday - Friday: 9am - 6pm", 
        item2: "Saturday: 10am - 2pm",
        details: "Sunday: Closed", 
        Icon: IconClockHour4 
    },
]

export const forms : Form[] = [
    {
        id: 1, 
        label: "Your Name", 
        placeholder: "John Doe"
    }, 

    {
        id: 2, 
        label: "Your Email", 
        placeholder: "john@example.com"
    }, 

    {
        id: 3, 
        label: "Subject" , 
        placeholder: "How can we help you?"
    }, 

    {
        id: 4, 
        label: "Your Message" , 
        placeholder: "Tell us more about your question or concern..."
    }
]

export const services: service[] = [
    {
        id: 1, 
        label: "24/7 Support", 
        details: "Get help whenever you need it", 
        Icon: IconHeadphones
    }, 

    {
        id: 2, 
        label: "Quick Response", 
        details: "We reply within 2 hours", 
        Icon: MessageSquare
    }, 

    {
        id: 3, 
        label: "Secure & Private", 
        details: "Your information is safe with us", 
        Icon: Shield
    }
]

export const faqs: faq[] = [
    {
        id: 1, 
        question: "What are your shipping policies?", 
        answer: "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days."
    }, 

    {
        id: 2, 
        question: "How can I track my order?", 
        answer: "Once your order ships, you'll receive a tracking number via email to monitor your package."
    },

    {
        id: 3, 
        question: "What is your return policy?", 
        answer: "We accept returns within 30 days of purchase. Items must be in original condition."
    },

    {
        id: 4, 
        question: "Do you offer international shipping?", 
        answer: "Yes, we ship worldwide. International shipping rates vary by destination."
    }
]

export const buttons: button[] = [
    {
        id: 1, 
        text: "call us now", 
        Icon: IconPhone
    }, 

    {
        id: 2, 
        text: "Live Chat", 
        Icon: IconMail
    }
]
