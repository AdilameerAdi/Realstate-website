import { createClient } from '@supabase/supabase-js';

// For demo purposes, using placeholder values
// In production, these should be in environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations
export const propertyService = {
  // Fetch all properties
  async getAllProperties() {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        // Fallback to static data for demo
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      // Fallback to static data for demo
      return { data: [], error: err };
    }
  },

  // Fetch properties by type
  async getPropertiesByType(type) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties by type:', error);
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: [], error: err };
    }
  },

  // Add new property
  async addProperty(property) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select();

      if (error) {
        console.error('Error adding property:', error);
        return { data: null, error };
      }

      return { data: data?.[0], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: null, error: err };
    }
  },

  // Update property
  async updateProperty(id, updates) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating property:', error);
        return { data: null, error };
      }

      return { data: data?.[0], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: null, error: err };
    }
  },

  // Delete property
  async deleteProperty(id) {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting property:', error);
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { error: err };
    }
  }
};

// Inquiries operations
export const inquiryService = {
  // Fetch all inquiries
  async getAllInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries:', error);
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: [], error: err };
    }
  },

  // Add new inquiry
  async addInquiry(inquiry) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          ...inquiry,
          status: 'New',
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Error adding inquiry:', error);
        return { data: null, error };
      }

      return { data: data?.[0], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: null, error: err };
    }
  },

  // Update inquiry status
  async updateInquiryStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating inquiry:', error);
        return { data: null, error };
      }

      return { data: data?.[0], error: null };
    } catch (err) {
      console.error('Supabase error:', err);
      return { data: null, error: err };
    }
  }
};