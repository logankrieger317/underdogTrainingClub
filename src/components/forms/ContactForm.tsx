import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData, ProgramType } from '../../types';
import { contactApi } from '../../api/client';

const programOptions: { value: ProgramType; label: string }[] = [
  { value: 'puppy_power', label: 'Puppy Power Program (Under 8 months)' },
  { value: 'foundations', label: 'Solid Pack Foundations (Over 8 months)' },
  { value: 'private_training', label: 'Private Training' },
  { value: 'stay_and_train', label: 'Stay & Train' },
  { value: 'pack_life_community', label: 'Pack Life Community' },
];

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dogName: '',
  dogBreed: '',
  dogAge: '',
  interestedPrograms: [],
  concerns: '',
  goals: '',
  preferredContactMethod: 'email',
  bestTimeToContact: '',
};

interface ContactFormProps {
  variant?: 'full' | 'compact';
  onSuccess?: () => void;
}

export function ContactForm({ variant = 'full', onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (program: ProgramType) => {
    setFormData((prev) => ({
      ...prev,
      interestedPrograms: prev.interestedPrograms.includes(program)
        ? prev.interestedPrograms.filter((p) => p !== program)
        : [...prev.interestedPrograms, program],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await contactApi.submit(formData);
      setSubmitStatus('success');
      setFormData(initialFormData);
      onSuccess?.();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          We've received your information and will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="btn-outline"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Submission Failed</p>
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="label">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="label">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Your last name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="label">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="(512) 555-1234"
          />
        </div>
      </div>

      {/* Dog Information */}
      {variant === 'full' && (
        <>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Your Dog</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="dogName" className="label">Dog's Name *</label>
                <input
                  type="text"
                  id="dogName"
                  name="dogName"
                  value={formData.dogName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Buddy"
                />
              </div>
              <div>
                <label htmlFor="dogBreed" className="label">Breed</label>
                <input
                  type="text"
                  id="dogBreed"
                  name="dogBreed"
                  value={formData.dogBreed}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Golden Retriever"
                />
              </div>
              <div>
                <label htmlFor="dogAge" className="label">Age</label>
                <input
                  type="text"
                  id="dogAge"
                  name="dogAge"
                  value={formData.dogAge}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="6 months"
                />
              </div>
            </div>
          </div>

          {/* Programs of Interest */}
          <div>
            <label className="label">Programs of Interest</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {programOptions.map((program) => (
                <label
                  key={program.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.interestedPrograms.includes(program.value)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.interestedPrograms.includes(program.value)}
                    onChange={() => handleProgramChange(program.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{program.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Goals & Concerns */}
          <div>
            <label htmlFor="concerns" className="label">
              What challenges are you experiencing?
            </label>
            <textarea
              id="concerns"
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="Tell us about any behavioral concerns or challenges..."
            />
          </div>

          <div>
            <label htmlFor="goals" className="label">
              What are your training goals?
            </label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows={3}
              className="input-field"
              placeholder="What would you like to achieve with training?"
            />
          </div>

          {/* Contact Preferences */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredContactMethod" className="label">
                Preferred Contact Method
              </label>
              <select
                id="preferredContactMethod"
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={handleChange}
                className="input-field"
              >
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
                <option value="text">Text Message</option>
              </select>
            </div>
            <div>
              <label htmlFor="bestTimeToContact" className="label">
                Best Time to Contact
              </label>
              <input
                type="text"
                id="bestTimeToContact"
                name="bestTimeToContact"
                value={formData.bestTimeToContact}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Weekday mornings"
              />
            </div>
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Request Free Consultation
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted about our training services.
        We respect your privacy and will never share your information.
      </p>
    </form>
  );
}
