using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EHIProject.Models;

namespace EHIProject.Controllers
{
    public class ContactController : ApiController
    {
        private EHIDBContext db = new EHIDBContext();

        // GET: api/tblContacts
        public IQueryable<Contacts> GetContacts()
        {
            return db.Contacts.Where(w=>w.Status==true);
        }

        // GET: api/tblContacts/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult GetContacts(long id)
        {
            Contacts tblContacts = db.Contacts.Find(id);
            if (tblContacts == null)
            {
                return NotFound();
            }

            return Ok(tblContacts);
        }

        // PUT: api/tblContacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContacts(long id, Contacts tblContacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblContacts.Id)
            {
                return BadRequest();
            }

            db.Entry(tblContacts).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (! ContactsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tblContacts
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult SaveContacts(Contacts Contacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contacts.Add(Contacts);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = Contacts.Id }, Contacts);
        }

        // DELETE: api/tblContacts/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult DeleteContacts(long id)
        {
            Contacts Contacts = db.Contacts.Find(id);
            if (Contacts == null)
            {
                return NotFound();
            }

            db.Contacts.Remove(Contacts);
            db.SaveChanges();

            return Ok(Contacts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactsExists(long id)
        {
            return db.Contacts.Count(e => e.Id == id) > 0;
        }
    }
}