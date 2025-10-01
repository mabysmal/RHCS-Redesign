const EventPreview = ({ entry, widgetFor, widgetsFor }) => {
    const title = entry.getIn(['data', 'title']) || 'Event Title';
    const startDateTime = entry.getIn(['data', 'startDateTime']) || '';
    const endDateTime = entry.getIn(['data', 'endDateTime']) || '';
    const location = entry.getIn(['data', 'location']) || '';
    const description = entry.getIn(['data', 'description']) || '';
  
    //
    const formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return { month: 'MON', day: '1', dayOfWeek: 'Monday', time: '12:00 PM' };
      
      try {
        const date = new Date(dateTimeString);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        return {
          month: months[date.getMonth()],
          day: date.getDate().toString(),
          dayOfWeek: days[date.getDay()],
          time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        };
      } catch (error) {
        return { month: 'MON', day: '1', dayOfWeek: 'Monday', time: '12:00 PM' };
      }
    };
  
    const startFormatted = formatDateTime(startDateTime);
    const endFormatted = formatDateTime(endDateTime);
  
  
    const truncateDescription = (text, maxLength = 100) => {
      if (!text) return '';
      const plainText = text.replace(/<[^>]*>/g, '');
      return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
    };
  
    const truncatedDescription = truncateDescription(description);
    const isDescriptionTruncated = description && description.replace(/<[^>]*>/g, '').length > 100;
  
    return h('div', {
      style: {
        fontFamily: 'Inter, system-ui, sans-serif',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px'
      }
    }, [
      h('h3', {
        style: {
          color: '#283618',
          marginBottom: '16px',
          fontSize: '18px',
          fontWeight: 'bold'
        }
      }, 'Event Preview'),
      
      h('div', {
        style: {
          backgroundColor: '#FEFAE0',
          border: '2px solid #283618',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, [
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }
        }, [
          // Date Display
          h('div', {
            style: {
              display: 'flex',
              justifyContent: 'center'
            }
          }, [
            h('div', {
              style: {
                backgroundColor: '#283618',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '16px 0',
                minWidth: '80px',
                width: '80px',
                textAlign: 'center',
                borderRadius: '4px'
              }
            }, [
              h('div', {
                style: {
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#FEFAE0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  paddingTop: '8px'
                }
              }, startFormatted.month),
              h('div', {
                style: {
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#FEFAE0',
                  margin: '4px 0'
                }
              }, startFormatted.day),
              h('div', {
                style: {
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#FEFAE0',
                  textTransform: 'capitalize',
                  paddingBottom: '8px'
                }
              }, startFormatted.dayOfWeek)
            ])
          ]),
          
          // Event Details
          h('div', {
            style: {
              flex: '1',
              minWidth: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }
          }, [
            h('h4', {
              style: {
                fontSize: '18px',
                fontWeight: '500',
                color: '#1f2937',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }
            }, title),
            
            // Time and Location
            h('div', {
              style: {
                marginBottom: '4px',
                fontSize: '14px',
                color: '#4b5563'
              }
            }, [
              h('div', {
                style: {
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '8px'
                }
              }, [
                // Clock icon (simplified)
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#283618',
                    borderRadius: '50%',
                    position: 'relative'
                  }
                }),
                h('span', {}, `${startFormatted.time} - ${endFormatted.time}`),
                
                location && h('span', {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }
                }, [
                  // Location icon (simplified)
                  h('span', {
                    style: {
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#283618',
                      borderRadius: '50%'
                    }
                  }),
                  h('span', {}, location)
                ])
              ])
            ]),
            
            // Description
            description && h('div', {
              style: {
                marginTop: '8px',
                fontSize: '14px',
                color: '#374151',
                lineHeight: '1.4'
              }
            }, [
              h('div', {
                dangerouslySetInnerHTML: {
                  __html: truncatedDescription
                }
              }),
              isDescriptionTruncated && h('button', {
                style: {
                  color: '#BC6C25',
                  fontWeight: '500',
                  marginTop: '4px',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }
              }, 'Read more')
            ])
          ])
        ])
      ])
    ]);
  };
  
  CMS.registerPreviewTemplate('tree-tours', EventPreview);