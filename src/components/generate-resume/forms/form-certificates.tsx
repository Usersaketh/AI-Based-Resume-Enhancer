import { CertificateItem, Certificates } from '@/lib/types'
import { CirclePlus } from 'lucide-react';


interface FormCertificatesProps {
    certificates: Certificates,
    setCertificates: (updater: (prev: Certificates) => Certificates) => void;
}

const FormCertificates: React.FC<FormCertificatesProps> = ({certificates, setCertificates}) => {

    const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof CertificateItem) => {
        const { value } = e.target;
        setCertificates(prev => {
            const updated = [...prev];
            updated[index] = {...updated[index], [field]: value || ''};
            return updated;
        });
    };

    const removeCertificate = (index: number) => {
        setCertificates(prev => prev.filter((_, i) => i !== index));
    }

    const addCertificate = () => {
        setCertificates(prev => [
            ...prev,
            {title: '', tag: ''}
        ])
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-xl sm:text-2xl border-b-2 pb-2'>Certificates</h1>
            <div className='flex flex-col gap-2 px-2 sm:px-5 lg:px-10'>
                {
                    certificates.map((certificate, index) => (
                        <div key={index} className='flex flex-col mb-6 sm:mb-10'>
                            <div className='flex gap-2 sm:gap-4 items-center mb-3'>
                                <div className='text-sm sm:text-lg font-semibold rounded-full bg-slate-200 border-neutral-700 border-2 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0'>
                                    <h1 className='text-black'>{index+1}</h1>
                                </div>
                                <button
                                onClick={() => removeCertificate(index)}
                                 className={`text-red-400 p-1 sm:p-2 px-2 sm:px-3 rounded-lg hover:bg-neutral-900 text-xs sm:text-sm ${index === 0 && 'hidden'}`}>
                                    Remove
                                </button>
                            </div>
                            <label className='flex flex-col sm:flex-row sm:gap-4 sm:items-center sm:justify-between text-slate-200 mb-2 sm:mb-1'>
                                <span className='mb-1 sm:mb-0 text-sm sm:text-base'>Certificate Title:</span>
                                <input
                                value={certificate?.title || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-4/6 py-2 px-3 text-sm sm:text-base'
                                onChange={(e) => handleCertificatesChange(e, index, 'title')}
                                placeholder="Enter certificate title"
                                />
                            </label>
                            <label className='flex flex-col sm:flex-row sm:gap-4 sm:items-center sm:justify-between text-slate-200 mb-2 sm:mb-1'>
                                <span className='mb-1 sm:mb-0 text-sm sm:text-base'>Certificate Tag:</span>
                                <input
                                value={certificate?.tag || ''}
                                className='bg-neutral-900 border-none rounded-lg focus:ring-0 w-full sm:w-4/6 py-2 px-3 text-sm sm:text-base'
                                onChange={(e) => handleCertificatesChange(e, index, 'tag')}
                                placeholder="Enter certificate tag"
                                />
                            </label>
                        </div>
                    ))
                }

                <div className='flex'>
                    <button
                        onClick={addCertificate}
                        className='bg-neutral-900 border-2 p-2 rounded-lg flex items-center hover:opacity-90 disabled:cursor-default disabled:opacity-50 w-fit text-sm sm:text-base'
                    >
                        <CirclePlus className='h-4 w-4 sm:h-5 sm:w-5' />
                        <p className='ml-1 sm:ml-2'>Add Certificate</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormCertificates
