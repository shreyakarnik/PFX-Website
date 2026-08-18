/* ============================================================
   "LET'S TALK!" LEAD-CAPTURE OVERLAY — shared component
   ------------------------------------------------------------
   Injects the overlay markup once per page, then wires up every
   element carrying data-talk-trigger (nav "Let's Talk!" pill,
   hero CTA, kiosk page CTAs, ...) to open it instead of
   navigating to contact.html. The anchors keep their normal
   href="contact.html" as a no-JS fallback.

   HUBSPOT SETUP: replace TALK_HUBSPOT_PORTAL_ID / TALK_HUBSPOT_FORM_GUID
   below with your real portal ID + form GUID (HubSpot > your form >
   Share > Embed code). Field names on the left of fieldMap below
   must match your HubSpot form's internal field names.
   ============================================================ */
(function(){
  var TALK_HUBSPOT_PORTAL_ID = "YOUR_PORTAL_ID";
  var TALK_HUBSPOT_FORM_GUID = "YOUR_FORM_GUID";

  var MARKUP = ''
    + '<div class="tm-overlay" id="talkOverlay" aria-hidden="true">'
    + '  <div class="tm-wrap">'
    + '    <div class="tm-card">'
    + '      <button type="button" class="tm-close" id="talkClose" aria-label="Close">X</button>'
    + '      <span class="tm-badge" id="talkBadge">1 min</span>'
    + '      <div class="tm-head">'
    + '        <h2>Ready to Explore Automation?</h2>'
    + '        <p>Contact us for detailed specifications, site requirements, and pricing. The more details you provide, the better we can assist you.</p>'
    + '      </div>'
    + '      <form class="tm-form" id="talkForm">'
    + '        <div class="tm-row">'
    + '          <div class="tm-group"><label>Email</label><input type="email" name="email" required></div>'
    + '          <div class="tm-group"><label>Last Name</label><input type="text" name="lastname" required></div>'
    + '        </div>'
    + '        <div class="tm-row">'
    + '          <div class="tm-group"><label>First Name</label><input type="text" name="firstname" required></div>'
    + '          <div class="tm-group"><label>Email</label><input type="text" name="email2"></div>'
    + '        </div>'
    + '        <div class="tm-row single">'
    + '          <div class="tm-group">'
    + '            <label>Country</label>'
    + '            <select name="country" required>'
    + '              <option value="">Please Select</option>'
    + '              <option>Canada</option>'
    + '              <option>United States</option>'
    + '              <option>Mexico/Costa Rica</option>'
    + '              <option>Outside of North America</option>'
    + '            </select>'
    + '          </div>'
    + '        </div>'
    + '        <p class="tm-note">Contact us for detailed specifications, site requirements, and pricing. The more details you provide, the better we can assist you.</p>'
    + '        <div class="tm-extra" id="talkExtra">'
    + '          <div class="tm-row">'
    + '            <div class="tm-group"><label>Company Name</label><input type="text" name="company"></div>'
    + '            <div class="tm-group"><label>Role</label><input type="text" name="role"></div>'
    + '          </div>'
    + '          <div class="tm-row">'
    + '            <div class="tm-group"><label>Address</label><input type="text" name="address"></div>'
    + '            <div class="tm-group"><label>City</label><input type="text" name="city"></div>'
    + '          </div>'
    + '          <div class="tm-row">'
    + '            <div class="tm-group"><label>Province/State</label><input type="text" name="province"></div>'
    + '            <div class="tm-group"><label>Postal/Zip Code</label><input type="text" name="postal"></div>'
    + '          </div>'
    + '          <div class="tm-row single">'
    + '            <div class="tm-group"><label>What Region/Market/Country Are You Interested In Developing? <span class="hint">Please be as specific as possible</span></label><input type="text" name="region_interest"></div>'
    + '          </div>'
    + '          <div class="tm-row">'
    + '            <div class="tm-group"><label>Units Interested</label>'
    + '              <select name="num_units"><option value="">Please Select</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select>'
    + '            </div>'
    + '            <div class="tm-group"><label>Unencumbered Cash Available</label>'
    + '              <select name="investment"><option value="">Please Select</option><option>$1,000,000+</option><option>$500,000 - $1,000,000</option><option>$100,000 - $500,000</option><option>&lt; $100,000</option></select>'
    + '            </div>'
    + '          </div>'
    + '          <div class="tm-row single">'
    + '            <div class="tm-group"><label>How Did You First Hear About PFX?</label>'
    + '              <select name="referral"><option value="">Please Select</option><option>Facebook</option><option>Instagram</option><option>Google</option><option>Web Search</option><option>News Article</option><option>Word of Mouth</option><option>Other</option></select>'
    + '            </div>'
    + '          </div>'
    + '          <div class="tm-row single">'
    + '            <div class="tm-group"><label>Additional Information (Optional) <span class="hint">Let us know if there is any additional information you\'d like to share!</span></label><textarea name="additional_info"></textarea></div>'
    + '          </div>'
    + '          <p class="tm-consent">By checking the boxes below, you consent to receive periodic email or SMS communications from PizzaForno and allow our team to reach out and provide information about our licensing opportunity. You may opt out at any time.</p>'
    + '          <div class="tm-checkbox-row"><input type="checkbox" id="talkConsentEmail" name="consent_email"><label for="talkConsentEmail">I agree to receive email communications</label></div>'
    + '          <div class="tm-checkbox-row"><input type="checkbox" id="talkConsentSms" name="consent_sms"><label for="talkConsentSms">I agree to receive SMS communications</label></div>'
    + '        </div>'
    + '        <div class="tm-actions" id="talkActions">'
    + '          <button type="submit" class="tm-submit" id="talkSubmitBtn">Submit Inquiry</button>'
    + '          <button type="button" class="tm-add-more" id="talkAddMore">Add More Information +</button>'
    + '        </div>'
    + '      </form>'
    + '    </div>'
    + '    <button type="button" class="tm-show-less" id="talkShowLess">Show Less</button>'
    + '  </div>'
    + '</div>';

  function init(){
    document.body.insertAdjacentHTML('beforeend', MARKUP);

    var overlay   = document.getElementById('talkOverlay');
    var card      = overlay.querySelector('.tm-card');
    var closeBtn  = document.getElementById('talkClose');
    var badge     = document.getElementById('talkBadge');
    var extra     = document.getElementById('talkExtra');
    var actions   = document.getElementById('talkActions');
    var addMore   = document.getElementById('talkAddMore');
    var showLess  = document.getElementById('talkShowLess');
    var form      = document.getElementById('talkForm');
    var submitBtn = document.getElementById('talkSubmitBtn');

    function openModal(e){
      if(e) e.preventDefault();
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('tm-locked');
    }
    function closeModal(){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('tm-locked');
    }
    function expand(){
      extra.classList.add('open');
      actions.classList.add('tm-expanded');
      showLess.classList.add('open');
      badge.textContent = '3 mins';
    }
    function collapse(){
      extra.classList.remove('open');
      actions.classList.remove('tm-expanded');
      showLess.classList.remove('open');
      badge.textContent = '1 min';
    }

    document.querySelectorAll('[data-talk-trigger]').forEach(function(el){
      el.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
    addMore.addEventListener('click', expand);
    showLess.addEventListener('click', collapse);

    form.addEventListener('submit', function(event){
      event.preventDefault();
      var data = new FormData(form);

      // Map this site's field names -> HubSpot internal field names.
      var fieldMap = {
        email: "email",
        lastname: "lastname",
        firstname: "firstname",
        country: "country",
        company: "company",
        role: "jobtitle",
        address: "address",
        city: "city",
        province: "state",
        postal: "zip",
        region_interest: "region_of_interest",
        num_units: "number_of_units",
        investment: "investment_range",
        referral: "how_did_you_hear_about_us",
        additional_info: "additional_information"
      };

      var fields = [];
      Object.keys(fieldMap).forEach(function(localName){
        var val = data.get(localName);
        if(val !== null && val !== ""){
          fields.push({ name: fieldMap[localName], value: val });
        }
      });

      var payload = {
        fields: fields,
        context: { pageUri: window.location.href, pageName: document.title }
      };
      var endpoint = "https://api.hsforms.com/submissions/v3/integration/submit/"
        + TALK_HUBSPOT_PORTAL_ID + "/" + TALK_HUBSPOT_FORM_GUID;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function(res){
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Inquiry';
        if(res.ok){
          alert("Thanks! Your inquiry has been submitted.");
          form.reset();
          collapse();
          closeModal();
        } else {
          alert("Something went wrong submitting the form. Please try again.");
        }
      })
      .catch(function(){
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Inquiry';
        alert("Something went wrong submitting the form. Please try again.");
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
