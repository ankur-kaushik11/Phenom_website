/* =========================================
   MODAL LOADER - Auto-inject enquiry modal
   and floating quote button
   ========================================= */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        injectFloatingQuote();
        initEnquiryModal();
    }

    // Inject Floating Quote Button
    function injectFloatingQuote() {
        // Check if it already exists
        if (document.querySelector('.floating-quote')) return;

        const floatingQuote = document.createElement('div');
        floatingQuote.className = 'floating-quote';
        floatingQuote.onclick = function() { openModal(); };
        floatingQuote.innerHTML = `
            <i class="fa-solid fa-pen-to-square"></i>
            <span>Get a Quote</span>
        `;
        document.body.appendChild(floatingQuote);
        console.log('✅ Floating quote button added');
    }

    function initEnquiryModal() {
        const existingModal = document.getElementById('enquiryModal');
        
        if (existingModal) {
            // If modal exists but is empty, inject content directly
            if (existingModal.innerHTML.trim() === '' || !existingModal.querySelector('.modal-content')) {
                injectModalContent(existingModal);
            }
        } else {
            // Create modal container and inject content
            const modalContainer = document.createElement('div');
            modalContainer.id = 'enquiryModal';
            modalContainer.className = 'modal';
            document.body.appendChild(modalContainer);
            injectModalContent(modalContainer);
        }
    }

    function injectModalContent(container) {
        container.innerHTML = `
            <div class="modal-content">
                <button class="close-btn" onclick="closeModal()">&times;</button>
                <h2><i class="fa-solid fa-clipboard-list"></i> Get a Free Consultation</h2>
                
                <div class="form-steps">
                    <div class="step active" data-step="1">
                        <div class="step-number">1</div>
                        <div class="step-label">Personal Info</div>
                    </div>
                    <div class="step-line"></div>
                    <div class="step" data-step="2">
                        <div class="step-number">2</div>
                        <div class="step-label">Business Details</div>
                    </div>
                    <div class="step-line"></div>
                    <div class="step" data-step="3">
                        <div class="step-number">3</div>
                        <div class="step-label">Services</div>
                    </div>
                </div>

                <form id="enquiryForm" action="https://formsubmit.co/info@phenomoutsourcing.com" method="POST">
                    <input type="hidden" name="_subject" value="🎉 New Enquiry from Phenom Outsourcing Website">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="box">
                    <input type="text" name="_honey" style="display:none">

                    <div class="form-step active" data-step="1">
                        <h3>Personal Information</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <div class="floating-label">
                                    <input type="text" id="userName" name="name" placeholder=" " required>
                                    <label for="userName">Full Name</label>
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="floating-label">
                                    <input type="email" id="userEmail" name="email" placeholder=" " required>
                                    <label for="userEmail">Email Address</label>
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <div class="floating-label">
                                    <input type="tel" id="userPhone" name="phone" placeholder=" " required>
                                    <label for="userPhone">Phone Number</label>
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="floating-label">
                                    <select id="countrySelect" name="country" required>
                                        <option value="">Select Country</option>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="UAE">UAE</option>
                                        <option value="India">India</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label for="countrySelect">Country</label>
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn-next" onclick="modalNextStep()">Next <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <div class="form-step" data-step="2">
                        <h3>Business Details</h3>
                        <div class="form-group">
                            <div class="floating-label">
                                <input type="text" id="businessName" name="business_name" placeholder=" " required>
                                <label for="businessName">Business Name</label>
                                <i class="fa-solid fa-building"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="floating-label">
                                <input type="url" id="websiteUrl" name="website" placeholder=" ">
                                <label for="websiteUrl">Website URL (Optional)</label>
                                <i class="fa-solid fa-link"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="floating-label">
                                <select id="businessType" name="business_type" required>
                                    <option value="">Select Business Type</option>
                                    <option value="Individual/Sole Proprietor">Individual/Sole Proprietor</option>
                                    <option value="Small Business (1-10 employees)">Small Business (1-10 employees)</option>
                                    <option value="Medium Business (11-50 employees)">Medium Business (11-50 employees)</option>
                                    <option value="Large Enterprise (50+ employees)">Large Enterprise (50+ employees)</option>
                                    <option value="Accounting Firm">Accounting Firm</option>
                                </select>
                                <label for="businessType">Business Type</label>
                                <i class="fa-solid fa-briefcase"></i>
                            </div>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn-prev" onclick="modalPrevStep()"><i class="fa-solid fa-arrow-left"></i> Previous</button>
                            <button type="button" class="btn-next" onclick="modalNextStep()">Next <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <div class="form-step" data-step="3">
                        <h3>Services You're Interested In</h3>
                        <div class="checkbox-grid">
                            <label class="checkbox-card"><input type="checkbox" name="services" value="Bookkeeping Services"><div class="checkbox-content"><i class="fa-solid fa-book"></i><span>Bookkeeping</span></div></label>
                            <label class="checkbox-card"><input type="checkbox" name="services" value="Payroll Services"><div class="checkbox-content"><i class="fa-solid fa-money-check-dollar"></i><span>Payroll</span></div></label>
                            <label class="checkbox-card"><input type="checkbox" name="services" value="Tax Preparation"><div class="checkbox-content"><i class="fa-solid fa-file-contract"></i><span>Tax Preparation</span></div></label>
                            <label class="checkbox-card"><input type="checkbox" name="services" value="Financial Reporting"><div class="checkbox-content"><i class="fa-solid fa-chart-line"></i><span>Financial Reporting</span></div></label>
                            <label class="checkbox-card"><input type="checkbox" name="services" value="Accounts Payable/Receivable"><div class="checkbox-content"><i class="fa-solid fa-receipt"></i><span>AP/AR Services</span></div></label>
                            <label class="checkbox-card"><input type="checkbox" name="services" value="CFO Services"><div class="checkbox-content"><i class="fa-solid fa-user-tie"></i><span>CFO Services</span></div></label>
                        </div>
                        <div class="form-group" style="margin-top: 2rem;">
                            <div class="floating-label">
                                <textarea id="requirements" name="message" rows="4" placeholder=" "></textarea>
                                <label for="requirements">Additional Requirements</label>
                                <i class="fa-solid fa-message"></i>
                            </div>
                        </div>
                        <div class="captcha-container">
                            <label class="captcha-checkbox">
                                <input type="checkbox" id="captchaCheck" name="human_verification" value="verified" required>
                                <span class="checkmark"></span>
                                <span class="captcha-text">I'm not a robot</span>
                            </label>
                            <div class="captcha-logo"><i class="fa-solid fa-shield-halved"></i> reCAPTCHA</div>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn-prev" onclick="modalPrevStep()"><i class="fa-solid fa-arrow-left"></i> Previous</button>
                            <button type="submit" class="btn-submit"><i class="fa-solid fa-paper-plane"></i> Submit Enquiry</button>
                        </div>
                    </div>
                </form>

                <div id="successAnimation" class="success-animation">
                    <i class="fa-solid fa-circle-check"></i>
                    <h3>Thank You!</h3>
                    <p>Your enquiry has been submitted successfully.</p>
                </div>
            </div>
        `;
        
        console.log('✅ Enquiry modal injected');
        initFormHandlers();
    }

    function initFormHandlers() {
        const form = document.getElementById('enquiryForm');
        if (form && !form.dataset.initialized) {
            form.dataset.initialized = 'true';
            form.addEventListener('submit', handleModalSubmit);
        }
    }

    // Track current step
    window.modalCurrentStep = 1;

    // Modal step navigation
    window.modalNextStep = function() {
        if (validateModalStep()) {
            if (window.modalCurrentStep < 3) {
                window.modalCurrentStep++;
                updateModalSteps();
            }
        }
    };

    window.modalPrevStep = function() {
        if (window.modalCurrentStep > 1) {
            window.modalCurrentStep--;
            updateModalSteps();
        }
    };

    function updateModalSteps() {
        const formSteps = document.querySelectorAll('#enquiryModal .form-step');
        const stepIndicators = document.querySelectorAll('#enquiryModal .form-steps .step');

        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === window.modalCurrentStep);
        });

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 <= window.modalCurrentStep);
        });
    }

    function validateModalStep() {
        const currentStep = document.querySelector(`#enquiryModal .form-step[data-step="${window.modalCurrentStep}"]`);
        if (!currentStep) return true;

        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            field.style.borderColor = '';
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields');
        }
        return isValid;
    }

    function handleModalSubmit(e) {
        e.preventDefault();

        if (!validateModalStep()) return false;

        const servicesChecked = document.querySelectorAll('#enquiryModal input[name="services"]:checked');
        if (servicesChecked.length === 0) {
            alert('Please select at least one service');
            return false;
        }

        const captcha = document.getElementById('captchaCheck');
        if (captcha && !captcha.checked) {
            alert('Please verify that you are not a robot');
            return false;
        }

        const form = document.getElementById('enquiryForm');
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('successAnimation').classList.add('show');
                form.reset();
                window.modalCurrentStep = 1;
                updateModalSteps();
                setTimeout(() => {
                    closeModal();
                    document.getElementById('successAnimation').classList.remove('show');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Failed');
            }
        })
        .catch(() => {
            alert('Error sending enquiry. Please try again.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

        return false;
    }

})();